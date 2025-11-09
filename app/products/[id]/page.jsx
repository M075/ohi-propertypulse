"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/assets/hooks/fetchProducts";
import { useProducts } from "@/assets/hooks/useProductsHook"; // Assuming we have this hook
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, MessageCircle } from "lucide-react";
import placeholder from "@/public/image.png";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/app/loading";
import RecentProducts from "@/assets/components/RecentProducts";
import ReviewTab from "@/assets/components/ReviewTabSection";
import { 
  ProductDetailImage, 
  ProductThumbnail,
  OptimizedImage 
} from "@/assets/components/OptimizedImages";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
const [selectedImage, setSelectedImage] = useState(0)

  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     if (!id) return;
  //     try {
  //       const product = await fetchProduct(id);
  //       setProduct(product);
  //       setReviews(product?.review);
  //       console.log(id)
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (product === null) {
  //     fetchProductData();
  //   }
  // }, [id, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        
        // Note: API now returns optimizedImages for different use cases
        // data.optimizedImages = [
        //   {
        //     thumbnail: "url?tr=w-150,h-150...",
        //     card: "url?tr=w-400,h-400...",
        //     detail: "url?tr=w-1200,h-1200...",
        //     mobile: "url?tr=w-800,h-800...",
        //     original: "url?tr=q-90..."
        //   }
        // ]
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  // Safe image access with fallback
  const images = product.images?.filter(img => img && img.trim() !== "") || ["/image.png"];



  // // Helper to safely get images - only valid ones
  // const getProductImages = () => {
  //   // If product is not loaded yet or images is not an array, return fallback
  //   if (!product || !Array.isArray(product.images) || product.images.length === 0) {
  //     return ["/image.png"]; // fallback image
  //   }

  //   // Filter out null, undefined, or empty string images
  //   const validImages = product.images.filter((img) => typeof img === "string" && img.trim() !== "");

  //   // If no valid images, return fallback
  //   return validImages.length > 0 ? validImages : ["/image.png"];
  // };

  // const images = getProductImages();

  return (
    <>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          {/* Main Image - Using ProductDetailImage (1200x1200, quality 85) */}
          <div className="aspect-square rounded-lg overflow-hidden border">
            <ProductDetailImage
              src={images[selectedImage]}
              alt={`${product.title} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`
                  aspect-square rounded-md overflow-hidden border-2 transition-all
                  ${selectedImage === index 
                    ? 'border-emerald-500 ring-2 ring-emerald-500' 
                    : 'border-gray-200 hover:border-gray-400'
                  }
                `}
              >
                {/* Using ProductThumbnail (150x150, quality 70) */}
                <ProductThumbnail
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Alternative: Carousel for Mobile */}
          <div className="md:hidden">
            <Carousel>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    {/* Using MobileImage preset (800x800, quality 75) */}
                    <OptimizedImage
                      src={img}
                      alt={`${product.title} - Image ${index + 1}`}
                      preset="mobile"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>
        </div>

        {/* RIGHT: Product Information */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-emerald-600">
                R {product.discountPercentage > 0
                  ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
                  : product.price
                }
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    R {product.price}
                  </span>
                  <span className="text-red-500 font-semibold">
                    -{product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {product.rating > 0 && (
              <div className="flex items-center gap-x-2">
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(product.rating))}
                </span>
                <span>{product.rating} / 5</span>
                {product.review?.length > 0 && (
                  <span className="text-gray-500">
                    ({product.review.length} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                  In Stock: {product.stock} units available
                </p>
              ) : (
                <p className="text-red-600 flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </p>
              )}
            </div>

            {/* Delivery Options */}
            {(product.deliveryOptions?.delivery || product.deliveryOptions?.collection) && (
              <div className="space-y-2">
                <h3 className="font-semibold">Delivery Options:</h3>
                <ul className="space-y-1">
                  {product.deliveryOptions.delivery && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Delivery Available
                    </li>
                  )}
                  {product.deliveryOptions.collection && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Collection Available
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </div>
        {/* <div className='bg-white dark:bg-background'> */}
        <main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="3gz_hy7"
        >
          {/* Tabs section */}
          <div className="mt-16" data-oid="1x3ep:4">
            <Tabs
              defaultValue="description"
              className="w-full"
              data-oid="l3y6ps3"
            >
              <TabsList className="grid w-full grid-cols-3 dark:bg-zinc-800" data-oid="wy_1_aj">
                <TabsTrigger value="description" data-oid="j28m3-3">
                  Description
                </TabsTrigger>
                <TabsTrigger value="reviews" data-oid="sdr57px">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="chat" data-oid="t63fmx3">
                  Chat
                </TabsTrigger>
              </TabsList>

              {/* Description Tab */}
              <TabsContent
                value="description"
                className="mt-6"
                data-oid="1y3ul-t"
              >
                <div className="space-y-4" data-oid="4p03e.c">
                  <h3
                    className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100"
                    data-oid="kr6m57h"
                  >
                    Product Details
                  </h3>
                  <p
                    className="text-gray-700 dark:text-gray-300"
                    data-oid="799kgte"
                  >
                    {product?.description}
                  </p>

                  <div
                    className="grid grid-cols-2 gap-4 mt-4"
                    data-oid="bc-:wde"
                  >
                    <div data-oid="xi92n9g">
                      <h4 className="font-medium" data-oid="8ta5dwb">
                        Brand
                      </h4>
                      <p data-oid="k.xnry-">{product?.brand || "N/A"}</p>
                    </div>
                    <div data-oid="v3.m44n">
                      <h4 className="font-medium" data-oid="uy1m6ti">
                        Category
                      </h4>
                      <p data-oid="hfkre8n">{product?.category || "N/A"}</p>
                    </div>
                    <div data-oid="i:7x.8b">
                      <h4 className="font-medium" data-oid="n5kv_aj">
                        Warranty
                      </h4>
                      <p data-oid="x-hwvav">{product?.warranty || "N/A"}</p>
                    </div>
                    <div data-oid="l4b:r-8">
                      <h4 className="font-medium" data-oid="o34ye0t">
                        Shipping From
                      </h4>
                      <p data-oid="d:gfo4o">
                        {product?.shippingOrigin || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4" data-oid="ntmn3m5">
                    <h4 className="font-medium" data-oid="m:.uvon">
                      Delivery Options
                    </h4>
                    <ul className="list-disc pl-5 mt-2" data-oid="_eg3:t4">
                      {product?.deliveryOptions?.delivery && (
                        <li data-oid="3k6.:zk">Delivery Available</li>
                      )}
                      {product?.deliveryOptions?.collection && (
                        <li data-oid="m8y5vni">Collection Available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Review Tab */}

              <ReviewTab product={product} data-oid="n_scx9f" />

              {/* Chat Tab */}
              <TabsContent value="chat" className="mt-6" data-oid="8fwkd6t">
                <div className="space-y-4" data-oid="l_99g_e">
                  <h3
                    className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100"
                    data-oid=":tnp:t9"
                  >
                    Live Chat
                  </h3>
                  <p
                    className="text-gray-700 dark:text-gray-300"
                    data-oid=":t0qd::"
                  >
                    Connect with our support team for any questions about this
                    product.
                  </p>
                  <Button
                    className="flex items-center space-x-2"
                    data-oid="xbnap8w"
                  >
                    <MessageCircle className="h-5 w-5" data-oid="nxgi.sh" />
                    <span data-oid="w97_-ay">Start Chat</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        {/* </div> */}
      </section>
      <RecentProducts data-oid="9lbv-5b" />
    </>
  );
}
