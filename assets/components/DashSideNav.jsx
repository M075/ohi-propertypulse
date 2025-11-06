"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "postcss";

const DashSideNav = () => {
  return (
    <>
      {/* <div className="flex items-center gap-4">
           <Sheet>
           <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <PanelLeft className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
           </SheetTrigger>
           <SheetContent side='left' className='sm:max-w-xs'>
                  <nav className='grid gap-6 text-lg font-medium'>
                <Link
                  href='#'
                  className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                >
                  <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>Acme Inc</span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Home className='h-5 w-5' />
                  Dashboard
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <ShoppingCart className='h-5 w-5' />
                  Orders
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-foreground'
                >
                  <Package className='h-5 w-5' />
                  Products
                </Link>
                <Link
                  href='/dashboard/products'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Users2 className='h-5 w-5' />
                  Customers
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Settings className='h-5 w-5' />
                  Settings
                </Link>
              </nav>
              
            </SheetContent>
           </Sheet>
           <div className='relative flex-1'>
           <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
           <input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
           />
           </div>
           </div> */}
      <aside
        className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r dark:border-zinc-800 bg-background sm:flex"
        data-oid="87prrp7"
      >
        <nav
          className="flex flex-col items-center gap-4 px-2 sm:py-5 mt-20"
          data-oid="g.mcs-e"
        >
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            data-oid="rkumyy7"
          >
            <Package2
              className="h-4 w-4 transition-all group-hover:scale-110"
              data-oid="5b_1bcv"
            />

            <span className="sr-only" data-oid="4kygocw">
              Acme Inc
            </span>
          </Link>
          <TooltipProvider data-oid="4j69niu">
            <Tooltip data-oid="0h1h.zq">
              <TooltipTrigger asChild data-oid="7eznh50">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="c_u-tro"
                >
                  <Home className="h-5 w-5" data-oid="j7.unny" />
                  <span className="sr-only" data-oid="5ri4500">
                    Dashboard
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid="84y3qbt">
                Dashboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider data-oid="8l:ed-h">
            <Tooltip data-oid="3:rfgzh">
              <TooltipTrigger asChild data-oid="z4s8c1d">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="640za_3"
                >
                  <ShoppingCart className="h-5 w-5" data-oid="ijbuflp" />
                  <span className="sr-only" data-oid="vhezjre">
                    Orders
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid="wz9:8qh">
                Orders
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider data-oid="kqc2kuy">
            <Tooltip data-oid="170o:6e">
              <TooltipTrigger asChild data-oid="__5xen-">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="blqebkq"
                >
                  <Package className="h-5 w-5" data-oid="m047tf7" />
                  <span className="sr-only" data-oid="7jxmn5o">
                    Products
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid="4gy600o">
                Products
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider data-oid="6vw8ue3">
            <Tooltip data-oid="d6v29mi">
              <TooltipTrigger asChild data-oid="se0yw2n">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="mcpl6x6"
                >
                  <Users2 className="h-5 w-5" data-oid="6-4bqw6" />
                  <span className="sr-only" data-oid="g98.igc">
                    Customers
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid=".2bp724">
                Customers
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider data-oid="qg1xt8q">
            <Tooltip data-oid="3q:_fm_">
              <TooltipTrigger asChild data-oid="b81w:hi">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="dc5b_qo"
                >
                  <LineChart className="h-5 w-5" data-oid="8x5ing6" />
                  <span className="sr-only" data-oid="gce84dj">
                    Analytics
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid="p_b:fwp">
                Analytics
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav
          className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"
          data-oid="hmks549"
        >
          <TooltipProvider data-oid="fk1b77u">
            <Tooltip data-oid="mwfzz7j">
              <TooltipTrigger asChild data-oid="bqx1t9s">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  data-oid="-ww_m_o"
                >
                  <Settings className="h-5 w-5" data-oid="56ub-vx" />
                  <span className="sr-only" data-oid="bt1l0d4">
                    Settings
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" data-oid="vj8bzmg">
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </>
  );
};

export default DashSideNav;
