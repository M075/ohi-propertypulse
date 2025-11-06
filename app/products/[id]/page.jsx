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
import { useSession } from "next-auth/react";
import { toast } from "@/components/hooks/use-toast";
import ReviewTab from "@/assets/components/ReviewTabSection";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        const product = await fetchProduct(id);
        setProduct(product);
        setReviews(product?.review);
        console.log(id)
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (product === null) {
      fetchProductData();
    }
  }, [id, product]);


  // Helper to safely get images - only valid ones
  const getProductImages = () => {
    if (!product.images || product.images.length === 0) {
      return ["/image.png"]; // fallback image
    }
    // Filter out null, undefined, or empty string images
    const validImages = product.images.filter(img => img && img.trim() !== "");
    
    // If no valid images, return fallback
    return validImages.length > 0 ? validImages : ["/image.png"];
  };

  const images = getProductImages();

  return (
    <>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-16 flex flex-col md:flex-row gap-24 py-10 rounded-2xl bg-gray-100 dark:bg-zinc-800">
          <div className="flex md:flex-1 md:w-1/2 items-center">
            <Carousel>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img || "/image.png"}
                      alt={`${product.title} - Image ${index + 1}`}
                      width={1300}
                      height={900}
                      className="w-full md:h-full object-cover rounded-lg"
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

          <div
            className="md:w-1/2 space-y-6 text-gray-700 dark:text-gray-300"
            data-oid="ech7o88"
          >
            <div data-oid="jo206nl">
              <p className="text-gray-600" data-oid="0vrx4ky">
                {product?.brand}
              </p>
              <h1
                className="text-gray-900 dark:text-white font-bold text-2xl sm:text-3xl md:text-4xl"
                data-oid="a9phq0d"
              >
                {product?.title}
              </h1>
            </div>
            <div className="space-y-4" data-oid="23is73q">
              <div className="flex space-x-4 items-center" data-oid="t:cf2le">
                <span className="text-2xl font-bold" data-oid="u5_7rb1">
                  R {product?.price}
                </span>
                {product?.discountPercentage > 0 && (
                  <span className="text-red-500" data-oid="dst3t64">
                    -{product?.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-x-4" data-oid="rhynurt">
                <span className="text-yellow-500" data-oid="jd0or7m">
                  {"★".repeat(Math.round(product?.rating || 0))}
                </span>
                <span data-oid="ttb-s.l">{product?.rating} / 5</span>
              </div>
            </div>

            <ul className="space-y-4" data-oid="rihsudm">
              <li className="flex items-center gap-x-4" data-oid=".0b_9tp">
                <span
                  className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 dark:bg-emerald-600 text-white"
                  data-oid="ld46z.4"
                >
                  ✓
                </span>
                Stock: {product?.stock} units available
              </li>
              {product?.deliveryOptions?.delivery && (
                <li className="flex items-center gap-x-4" data-oid="5_naw6:">
                  <span
                    className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 dark:bg-emerald-600 text-white"
                    data-oid="ynb9pe3"
                  >
                    ✓
                  </span>
                  Delivery Available
                </li>
              )}
              {product?.deliveryOptions?.collection && (
                <li className="flex items-center gap-x-4" data-oid="gduxpud">
                  <span
                    className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 dark:bg-emerald-600 text-white"
                    data-oid="k3wy.rs"
                  >
                    ✓
                  </span>
                  Collection Available
                </li>
              )}
            </ul>

            <div className="flex" data-oid="cq:ibnb">
              <Link
                href="#"
                className="px-5 h-11 flex items-center bg-emerald-600 dark:bg-emerald-500 rounded-lg text-white"
                data-oid="kf-t7-l"
              >
                {product?.stock > 0 ? "Get In Touch" : "Out of Stock"}
              </Link>
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
