"use client";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ProductCard = ({ product }) => {
  // console.log(product.images[0])

  return (
    <div data-oid="v5t8a:8">
      <Link
        href={`/products/${product._id}`}
        className="block rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shadow-indigo-100 dark:shadow-gray-700 hover:shadow-lg"
        data-oid="yt2t_41"
      >
        <Image
          alt=""
          src={product?.images[0]}
          className="w-full h-[250px] rounded-t-lg object-cover mx-0 my-0"
          height={150}
          width={300}
          data-oid="5hqa85y"
        />

        <div className="mt-2 p-4" data-oid="bcojy8g">
          <div className="flex flex-row justify-between " data-oid="t9gxv.g">
            <dl data-oid="0514gdb">
              <div data-oid="rce:yt2">
                <dt className="sr-only" data-oid="ym4o5pl"></dt>

                <dd className="text-sm text-gray-500" data-oid="8xgedws">
                  $ {product.price}
                </dd>
              </div>

              <div data-oid="bigndjz">
                <dt className="sr-only" data-oid="m3b.:vd">
                  Address
                </dt>

                <dd className="font-medium" data-oid="6_8zc74">
                  {product.title}
                </dd>
              </div>
            </dl>

            <Button className="rounded-full p-3" data-oid="4tt4.zz">
              <ShoppingCart className="h-4 w-4" data-oid="p:brb4y" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
