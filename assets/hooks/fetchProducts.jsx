// api.js
export async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch a single property
export async function fetchProduct(id) {
  try {
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
    
    console.log("API Domain:", apiDomain);
    console.log("Fetching product ID:", id);
    
    if (!apiDomain) {
      console.error("API domain is not configured");
      throw new Error("API domain is not configured");
    }

    const url = `${apiDomain}/products/${id}`;
    console.log("Fetching from URL:", url);
    
    const res = await fetch(url, {
      cache: "no-store" // Add this to ensure fresh data
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Product data received:", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw instead of returning null
  }
}
// You can add more API functions here as needed
