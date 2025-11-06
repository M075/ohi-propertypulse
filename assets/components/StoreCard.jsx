import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";

const ShopCard = ({ shop, onLike }) => {
  return (
    <Card
      className="overflow-hidden pt-6 block rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shadow-indigo-100 dark:shadow-gray-700 hover:shadow-lg"
      data-oid="bjun-i1"
    >
      <CardContent className="p-6" data-oid="v61-exx">
        <div className="flex flex-col items-center" data-oid="uywlja.">
          <img
            src={shop.avatar}
            alt={shop.name}
            className="w-16 h-16 rounded-full mb-3"
            data-oid="6sk9rut"
          />

          <h3
            className="text-xl font-semibold mb-4 text-foreground"
            data-oid="t-:t-6_"
          >
            {shop.name}
          </h3>
          <div className="flex space-x-3" data-oid="i8wuu-3">
            <Button
              variant="outline"
              className="text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white dark:hover:text-white"
              data-oid="m_s:2.-"
            >
              View Store
            </Button>
            <Button
              variant="outline"
              onClick={() => onLike(shop.id)}
              className={`${
                shop.isLiked
                  ? "bg-red-500 text-white border-red-500"
                  : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              }`}
              data-oid="dtdcuc7"
            >
              <Heart
                className={`h-4 w-4 ${shop.isLiked ? "fill-current" : ""}`}
                data-oid="o:5i2ql"
              />
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex p-0 border-t" data-oid="6k3c-p_">
        <div
          className="flex-1 px-4 py-3 text-center border-r"
          data-oid="i83t-n3"
        >
          <div
            className="text-lg font-semibold text-foreground"
            data-oid="2c6ztoa"
          >
            {shop.likes}
          </div>
          <div className="text-sm text-muted-foreground" data-oid="4i5c.:h">
            Likes
          </div>
        </div>
        <div className="flex-1 px-4 py-3 text-center" data-oid="dnvzz.y">
          <div
            className="text-lg font-semibold text-foreground"
            data-oid="xbbmki4"
          >
            {shop.totalProducts}
          </div>
          <div className="text-sm text-muted-foreground" data-oid="8e0h_p7">
            Total Products
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;
