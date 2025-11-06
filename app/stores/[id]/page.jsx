"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, FilterIcon } from "lucide-react";

const StorePage = () => {
  const [sortOption, setSortOption] = useState("featured");
  const [itemsPerPage, setItemsPerPage] = useState("12");

  const products = [
    {
      id: 1,
      name: "SLEEVE BASKETBALL T-SHIRT FOR MEN - B...",
      price: 68.0,
      discount: 3,
      rating: 0,
      image: "/image.png",
      reviews: 0,
    },
    {
      id: 2,
      name: "T-SHIRT WITH GUCCI BLADE PRINT",
      price: 58.0,
      discount: 3,
      rating: 0,
      image: "/image.png",
      reviews: 0,
    },
    {
      id: 3,
      name: 'NIKE AIR JORDAN 4 RETRO "RED METALLIC"',
      price: 257.0,
      discount: 1,
      rating: 0,
      image: "/image.png",
      reviews: 0,
    },
  ];

  return (
    <div
      className="min-h-screen bg-zinc-50 dark:bg-zinc-900"
      data-oid="m6enmg7"
    >
      {/* Hero Section */}
      <div
        className="relative h-64 bg-gradient-to-r from-zinc-800 to-zinc-900"
        data-oid="51tuh8m"
      >
        <div className="absolute inset-0 bg-black/50" data-oid=":2vnnnu">
          <div
            className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center"
            data-oid="3x5:98r"
          >
            <h1
              className="text-4xl font-bold text-white mb-2"
              data-oid="8n5e91z"
            >
              Elite Boutique
            </h1>
            <div
              className="flex items-center text-zinc-300 space-x-2"
              data-oid="4xih9zc"
            >
              <Link href="/" className="hover:text-white" data-oid="yko:r0c">
                Home
              </Link>
              <span data-oid="02.eas:">/</span>
              <Link
                href="/shops"
                className="hover:text-white"
                data-oid="vlsxdjz"
              >
                Shops
              </Link>
              <span data-oid="_j3dt4-">/</span>
              <span className="text-white" data-oid="nhpieaz">
                Elite Boutique
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8" data-oid="49:bbyh">
        {/* Filters and Sort */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0"
          data-oid="mbqfhaf"
        >
          <p className="text-zinc-600 dark:text-zinc-400" data-oid="9as.r.:">
            Showing 1-3 of 3 items
          </p>
          <div className="flex space-x-4" data-oid="wx.bnkp">
            <Button variant="outline" size="icon" data-oid="a0r21kq">
              <FilterIcon className="h-4 w-4" data-oid="du7iasn" />
            </Button>
            <Select
              value={sortOption}
              onValueChange={setSortOption}
              data-oid="m0-ssmf"
            >
              <SelectTrigger className="w-[180px]" data-oid="w.n6.-a">
                <SelectValue placeholder="Sort by" data-oid="bwy:.v1" />
              </SelectTrigger>
              <SelectContent data-oid="ac11oy6">
                <SelectItem value="featured" data-oid="qycqz:s">
                  Featured
                </SelectItem>
                <SelectItem value="newest" data-oid="hlfly4q">
                  Newest
                </SelectItem>
                <SelectItem value="price-low" data-oid="3ot4-so">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" data-oid="u_.4qif">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="top-rated" data-oid="elb8x:z">
                  Top Rated
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={itemsPerPage}
              onValueChange={setItemsPerPage}
              data-oid=":0lwb2:"
            >
              <SelectTrigger className="w-[100px]" data-oid="f0x03en">
                <SelectValue placeholder="Show" data-oid="21w_9lt" />
              </SelectTrigger>
              <SelectContent data-oid="1:a1qu9">
                <SelectItem value="12" data-oid="q4ywkvx">
                  Show: 12
                </SelectItem>
                <SelectItem value="24" data-oid="qese8lk">
                  Show: 24
                </SelectItem>
                <SelectItem value="36" data-oid="ua1:dz0">
                  Show: 36
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-oid="1vuyz.p"
        >
          {products.map((product) => (
            <Card key={product.id} className="group" data-oid="dpbuccm">
              <CardHeader className="p-0" data-oid="qptteyr">
                <div
                  className="relative aspect-square overflow-hidden rounded-t-lg"
                  data-oid="9a53pfy"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-oid="0q5mtxw"
                  />

                  {product.discount > 0 && (
                    <Badge
                      className="absolute top-4 right-4 bg-red-500"
                      data-oid="_04cdg0"
                    >
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4" data-oid="rtkiaa1">
                <h3
                  className="font-medium text-lg mb-2 text-zinc-900 dark:text-zinc-100"
                  data-oid="euaber7"
                >
                  {product.name}
                </h3>
                <div
                  className="flex items-center justify-between"
                  data-oid="e8a8v2v"
                >
                  <p
                    className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
                    data-oid="yleiqvl"
                  >
                    ${product.price.toFixed(2)}
                  </p>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="kfam6:b"
                  >
                    <StarIcon
                      className="h-4 w-4 text-yellow-400"
                      data-oid="f21-qpx"
                    />

                    <span
                      className="text-sm text-zinc-600 dark:text-zinc-400"
                      data-oid="8zm-s_8"
                    >
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0" data-oid="oe3dgto">
                <Button className="w-full" data-oid="9:gjx2r">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2" data-oid="e_kcdzw">
          <Button variant="outline" disabled data-oid="h:8rop2">
            Previous
          </Button>
          <Button variant="default" data-oid="jqvy.rq">
            1
          </Button>
          <Button variant="outline" data-oid="91ncqb7">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
