import connectDB from "@/config/database";
import Product from "@/models/Product";
import { getSessionUser } from "@/utils/getSessionUser";

const uploadToFreeImageHost = async (file) => {
  try {
    const formData = new FormData();
    formData.append("source", file);
    formData.append("key", process.env.FREEIMAGE_API_KEY);

    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.image.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    
    // Await params in Next.js 15+
    const { id } = await params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Product ID is required" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return new Response(
        JSON.stringify({ message: "Product Not Found" }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify(product), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    await connectDB();
    
    // Await params in Next.js 15+
    const { id } = await params;
    
    if (!id) {
      return new Response("Product ID is required", { status: 400 });
    }
    
    const product = await Product.findById(id);
    if (!product) return new Response("Product Not Found", { status: 404 });

    if (product.owner.toString() !== sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await product.deleteOne();
    return new Response("Product Deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    
    // Get session user with proper error handling
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized - No valid session" }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { userId } = sessionUser;
    
    // Await params in Next.js 15+
    const { id } = await params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Product ID is required" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const formData = await request.formData();
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return new Response(
        JSON.stringify({ message: "Product not found" }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (existingProduct.owner.toString() !== userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized - You don't own this product" }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle image uploads
    let imageUrls = [...existingProduct.images]; // Start with existing images
    const files = formData.getAll("images");

    if (files.length > 0) {
      const uploadPromises = files
        .filter((file) => file.size > 0) // Only process files that have content
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const blob = new Blob([buffer], { type: file.type });
          return uploadToFreeImageHost(blob);
        });

      const newUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newUrls];
    }
    
    const removedImages = JSON.parse(formData.get("removedImages") || "[]");

    // Filter out removed images
    if (removedImages.length > 0) {
      imageUrls = imageUrls.filter((url) => !removedImages.includes(url));
    }

    const productData = {
      owner: userId,
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price") || 0,
      discountPercentage: formData.get("discountPercentage") || 0,
      rating: formData.get("rating") || 0,
      reviews: formData.get("reviews"),
      stock: formData.get("stock") || 0,
      brand: formData.get("brand"),
      category: formData.get("category"),
      deliveryOptions: JSON.parse(formData.get("deliveryOptions") || "{}"),
      keywords: formData.get("keywords"),
      warranty: formData.get("warranty"),
      shippingOrigin: formData.get("shippingOrigin"),
      featured: formData.get("featured"),
      thumbnail: formData.get("thumbnail"),
      images: imageUrls, // Use combined array of existing and new images
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true }
    );
    
    return new Response(
      JSON.stringify(updatedProduct), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({ message: `Failed to edit product: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};