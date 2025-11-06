"use client";
import React, { useState } from "react";
import StoreCard from "@/assets/components/StoreCard";

const StoresPage = () => {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Busy Mart",
      avatar: "/api/placeholder/50/50",
      likes: 1,
      totalProducts: 4,
      isLiked: false,
    },
    {
      id: 2,
      name: "Luxury Emporium",
      avatar: "/api/placeholder/50/50",
      likes: 1,
      totalProducts: 9,
      isLiked: false,
    },
    {
      id: 3,
      name: "Elite Boutique",
      avatar: "/api/placeholder/50/50",
      likes: 2,
      totalProducts: 5,
      isLiked: false,
    },
    {
      id: 4,
      name: "Tech & Trend",
      avatar: "/api/placeholder/50/50",
      likes: 3,
      totalProducts: 7,
      isLiked: false,
    },
    {
      id: 5,
      name: "Best Cart",
      avatar: "/api/placeholder/50/50",
      likes: 4,
      totalProducts: 6,
      isLiked: false,
    },
    {
      id: 6,
      name: "Ad Culpa In Ipsum D",
      avatar: "/api/placeholder/50/50",
      likes: 2,
      totalProducts: 8,
      isLiked: false,
    },
  ]);

  const handleLike = (shopId) => {
    setShops(
      shops.map((shop) => {
        if (shop.id === shopId) {
          return {
            ...shop,
            likes: shop.isLiked ? shop.likes - 1 : shop.likes + 1,
            isLiked: !shop.isLiked,
          };
        }
        return shop;
      }),
    );
  };

  return (
    <>
      <div className="mt-20" data-oid="jhjpda3">
        <div className="p-8" data-oid="8oxel6r">
          <div className="text-center mb-8" data-oid="v4xj1xl">
            <h1
              className="text-4xl font-bold mb-2 text-foreground"
              data-oid="y.6g_f0"
            >
              All Shops
            </h1>
            <p className="text-muted-foreground" data-oid="a4m1nd.">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="o.-mbi_"
          >
            {shops.map((shop) => (
              <StoreCard
                key={shop.id}
                shop={shop}
                onLike={handleLike}
                data-oid="4ajt.02"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoresPage;
