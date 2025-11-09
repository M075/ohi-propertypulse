"use client";
import React, { useState } from "react";
import StoreCard from "@/assets/components/StoreCard";
import Image from "next/image";

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

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

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
    <div className="relative isolate overflow-hidden bg-white dark:bg-zinc-900 py-24 sm:py-20">
          <Image
            height={1500}
            width={2830}
            alt=""
            src="https://plus.unsplash.com/premium_photo-1677456379788-82ca409e5bfc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
            className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center opacity-30 dark:opacity-20"
          />
           <div
                className="h-10 w-2/3 bg-gradient-to-br from-emerald-500 opacity-20 blur-2xl dark:from-emerald-500 dark:invisible dark:opacity-40"
                data-oid="bjik9br"
              ></div>
              <div
                className="h-10 w-3/5 bg-gradient-to-r from-emerald-500 opacity-40 blur-2xl dark:from-emerald-500 dark:opacity-40"
                data-oid="m4g0puw"
              ></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">See what others are selling nearby</h2>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-700 dark:text-gray-300 sm:text-xl/8">
                View sellers around you. Find the perfect store that suits your needs and preferences.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-gray-700 dark:text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                {links.map((link) => (
                  <a key={link.name} href={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col-reverse gap-1">
                    <dt className="text-base/7 text-gray-500 dark:text-gray-300">{stat.name}</dt>
                    <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
    
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
