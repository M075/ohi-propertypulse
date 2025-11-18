import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StoreListCard = ({ shop, onLike, isHighlighted }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isHighlighted) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);

  return (
    <Card
      id={`store-${shop.id}`}
      className={`
        overflow-hidden transition-all duration-400 ease-in-out
        ${animate ? 'ring-2 ring-emerald-500 shadow-emerald-200 dark:shadow-emerald-900' : 'border-none'}
        bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm
        hover:shadow-md hover:ring-2 hover:ring-emerald-500
      `}
    >
      <div className="flex flex-row justify-center gap-4 p-6">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto sm:mx-0">
            <Image
              src={shop.avatar}
              alt={shop.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 ml-4">
            <h3 className="text-xl font-semibold dark:text-white mb-2">
              {shop.name}
            </h3>
            
            {shop.about && (
              <p className="text-sm dark:text-gray-300 line-clamp-2 mb-3">
                {shop.about}
              </p>
            )}

            {(shop.city || shop.province) && (
              <div className="text-sm dark:text-gray-200 flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 dark:text-gray-200" />
                <span>
                  {shop.city && shop.province 
                    ? `${shop.city}, ${shop.province}` 
                    : shop.city || shop.province}
                </span>
              </div>
            )}

            {/* Stats - Mobile Friendly */}
            <div className="flex gap-6 text-sm">
              <div>
                <div className="font-semibold dark:text-white">{shop.likes}</div>
                <div className="text-gray-600 dark:text-gray-400">Likes</div>
              </div>
              <div>
                <div className="font-semibold dark:text-white">{shop.totalProducts}</div>
                <div className="text-gray-600 dark:text-gray-400">Products</div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="space-x-2 sm:space-y-2 sm:my-auto sm:justify-center">
            
            <Button
              variant="outline"
              onClick={() => onLike(shop.id)}
              className={`sm:flex-none ${
                shop.isLiked 
                  ? 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:text-white' 
                  : 'text-red-500 border-red-500 dark:bg-transparent dark:hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${shop.isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Link href={`/stores/${shop.id}`} className="flex-1 sm:flex-none">
              <Button className=" bg-emerald-600 hover:bg-emerald-700 text-white">
                <Eye className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">View</span>
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoreListCard;