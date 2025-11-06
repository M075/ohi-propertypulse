"use client";
import ProductCard from "@/assets/components/ProductCard";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useProducts } from "@/assets/hooks/useProductsHook";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Loading data-oid="pzds3qp" />;
  if (error) return <div data-oid="bo4bvh8">Error: {error}</div>;

  return (
    <section className="px-4 py-6" data-oid="ufqa9vs">
      <div
        className="container-xl lg:container m-auto px-4 py-6"
        data-oid="4z4mxwh"
      >
        {products?.length === 0 ? (
          <Loading data-oid="g9o90ds" />
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6"
            data-oid="10m8o3v"
          >
            {products.map((product, index) => (
              <ProductCard product={product} key={index} data-oid="lwe.rm5" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
