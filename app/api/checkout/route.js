// app/api/checkout/route.js - FIXED VERSION
import connectDB from '@/config/database';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { calculateShipping, estimateDelivery, validateShippingAddress, getAvailableShippingMethods } from '@/utils/shipping';
import { createPayFastPayment } from '@/utils/payfast';

// GET - Get shipping methods for checkout
export async function GET(request) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Johannesburg';
    const province = searchParams.get('province') || 'Gauteng';

    const cart = await Cart.findOne({ user: sessionUser.userId })
      .populate('items.product', 'deliveryOptions');

    if (!cart || cart.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const destination = { city, province };
    const shippingMethods = getAvailableShippingMethods(cart.items, destination);

    return new Response(
      JSON.stringify({ shippingMethods }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Checkout GET error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// POST - Create orders from cart (FIXED)
export async function POST(request) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { shippingAddress, shippingMethod, paymentMethod, customerNotes } = body;

    // Validate shipping address - handle both 'region' and 'province' field names
    const normalizedAddress = {
      ...shippingAddress,
      province: shippingAddress.province || shippingAddress.region,
    };

    const addressValidation = validateShippingAddress(normalizedAddress);
    if (!addressValidation.valid) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid shipping address', 
          details: addressValidation.errors 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get cart with populated products
    const cart = await Cart.findOne({ user: sessionUser.userId })
      .populate('items.product', 'title images price stock ownerName owner deliveryOptions');

    if (!cart || cart.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify stock availability
    for (const item of cart.items) {
      if (!item.product) {
        return new Response(
          JSON.stringify({ error: 'One or more products no longer exist' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (item.product.stock < item.quantity) {
        return new Response(
          JSON.stringify({ 
            error: `Insufficient stock for ${item.product.title}`,
            productId: item.product._id 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get user details
    const user = await User.findById(sessionUser.userId);

    // FIXED: Group items by seller and create separate orders
    const ordersBySeller = {};
    
    for (const item of cart.items) {
      const sellerId = item.product.owner.toString();
      
      if (!ordersBySeller[sellerId]) {
        ordersBySeller[sellerId] = {
          seller: sellerId,
          sellerName: item.product.ownerName,
          items: [],
          subtotal: 0,
        };
      }
      
      ordersBySeller[sellerId].items.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        productSnapshot: {
          title: item.product.title,
          image: item.product.images?.[0] || '/image.png',
          ownerName: item.product.ownerName,
        },
      });
      
      ordersBySeller[sellerId].subtotal += item.price * item.quantity;
    }

    // Create separate orders for each seller
    const createdOrders = [];
    
    for (const [sellerId, orderData] of Object.entries(ordersBySeller)) {
      // Calculate costs for this seller's order
      const shippingCost = calculateShipping(
        orderData.items.map(item => ({
          ...item,
          weight: 0.5, // Default weight
        })),
        normalizedAddress,
        shippingMethod || 'standard'
      );

      const tax = orderData.subtotal * 0.15; // 15% VAT
      const total = orderData.subtotal + shippingCost + tax;

      // FIXED: Create order with correct field names
      const order = await Order.create({
        buyer: sessionUser.userId,
        buyerEmail: normalizedAddress.email || user.email,
        seller: sellerId,
        sellerName: orderData.sellerName,
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping: shippingCost,
        tax,
        total,
        shippingAddress: {
          fullName: normalizedAddress.company || user.storename,
          phone: normalizedAddress.phone,
          address: normalizedAddress.address,
          apartment: normalizedAddress.apartment,
          city: normalizedAddress.city,
          province: normalizedAddress.province,
          zipCode: normalizedAddress.postalCode,
          country: 'South Africa',
        },
        shippingMethod: shippingMethod || 'standard',
        estimatedDelivery: estimateDelivery(
          shippingMethod || 'standard', 
          'Johannesburg', 
          normalizedAddress.city
        ),
        paymentMethod: paymentMethod || 'payfast',
        customerNotes,
        status: 'pending',
        paymentStatus: 'pending',
        statusHistory: [{
          status: 'pending',
          timestamp: new Date(),
          note: 'Order created',
        }],
      });

      createdOrders.push(order);
      
      // Reduce stock for each item
      for (const item of orderData.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    // Clear cart after successful order creation
    await Cart.findByIdAndUpdate(cart._id, { items: [] });

    // FIXED: Handle PayFast payment for first order (or combine if needed)
    let paymentUrl = null;
    if (paymentMethod === 'payfast' && createdOrders.length > 0) {
      const baseUrl = process.env.NEXTAUTH_URL;
      const firstOrder = createdOrders[0];
      
      const payfastData = createPayFastPayment(
        {
          ...firstOrder.toObject(),
          user: { email: user.email },
        },
        `${baseUrl}/dashboard/purchases/${firstOrder._id}`,
        `${baseUrl}/checkout`,
        `${baseUrl}/api/payment/payfast/notify`
      );

      paymentUrl = payfastData.url;
      
      // Store PayFast data
      firstOrder.paymentDetails = {
        payfastPaymentId: firstOrder.orderNumber,
      };
      await firstOrder.save();
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        orders: createdOrders.map(o => ({
          _id: o._id,
          orderNumber: o.orderNumber,
          total: o.total,
          seller: o.seller,
        })),
        message: `${createdOrders.length} order(s) created successfully`,
        paymentUrl,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process checkout',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}