import connectDB from '@/config/database';
import Product from '@/models/Product';
import { getSessionUser } from '@/utils/getSessionUser';

const uploadToFreeImageHost = async (file) => {
  try {
    const formData = new FormData();
    formData.append('source', file);
    formData.append('key', process.env.FREEIMAGE_API_KEY);

    const response = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.image.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export const GET = async (request) => {
  try {
    await connectDB();
    const products = await Product.find();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const formData = await request.formData();
    const imageFiles = formData.getAll('images').filter(image => image.name !== '');
    
    const imageUrls = await Promise.all(
      imageFiles.map(async (image) => {
        const buffer = Buffer.from(await image.text(), 'base64');
        const blob = new Blob([buffer], { type: image.type });
        return uploadToFreeImageHost(blob);
      })
    );

    const productData = {
      owner: sessionUser.userId,
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price') || 0,
      stock: formData.get('stock') || 0,
      brand: formData.get('brand'),
      category: formData.get('category'),
      status: formData.get('status'),
      deliveryOptions: JSON.parse(formData.get('deliveryOptions')),
      keywords: formData.get('keywords'),
      featured: formData.get('featured'),
      rating: formData.get('rating') || 0,
      warranty: formData.get('warranty'),
      review: formData.getAll('review').map(review => JSON.parse(review)),
      discountPercentage: formData.get('discountPercentage') || 0,
      images: imageUrls,
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    return Response.redirect(`/dashboard/products/list`);
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};