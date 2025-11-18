// app/api/admin/dashboard/route.js
import connectDB from '@/config/database';
import User from '@/models/User';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { getSessionUser } from '@/utils/getSessionUser';

export async function GET(request) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    // Check admin privileges
    if (!sessionUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = await User.findById(sessionUser.userId);
    if (!user?.isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Gather statistics
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      recentOrders,
      recentUsers,
      flaggedProducts
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('buyer', 'storename email')
        .populate('seller', 'storename'),
      User.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('storename email image isActive createdAt'),
      Product.find({ flagged: true })
        .limit(20)
        .select('title images flagReason')
    ]);

    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const activeStores = await User.countDocuments({ 
      isActive: true,
      storename: { $exists: true, $ne: '' }
    });

    const stats = {
      totalUsers,
      totalSellers: activeStores,
      totalBuyers: totalUsers - activeStores,
      totalProducts,
      totalOrders,
      pendingOrders: await Order.countDocuments({ status: 'pending' }),
      totalRevenue: totalRevenue[0]?.total || 0,
      activeStores,
    };

    return new Response(
      JSON.stringify({ 
        stats, 
        recentOrders, 
        recentUsers,
        flaggedProducts 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// app/api/admin/users/[userId]/route.js
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const admin = await User.findById(sessionUser.userId);
    if (!admin?.isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { userId } = await params;
    const { action } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    switch (action) {
      case 'suspend':
        user.isActive = false;
        break;
      case 'activate':
        user.isActive = true;
        break;
      case 'delete':
        await User.findByIdAndDelete(userId);
        return new Response(
          JSON.stringify({ message: 'User deleted' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    await user.save();

    return new Response(
      JSON.stringify({ user }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Admin user action error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}