"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PanelTop,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import profile from "@/public/profile.png";

const DashHeader = ({ breadcrumbs }) => {
  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      data-oid=":h0k32m"
    >
      <Breadcrumb className="hidden md:flex" data-oid="_yrxgfj">
        <BreadcrumbList data-oid=":zmsqti">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem data-oid="5n:kyqx">
                <BreadcrumbLink asChild data-oid="2uu6fgf">
                  <Link href={breadcrumb.link} data-oid="4ad6frt">
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator data-oid="syn:9o:" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            />
           </div> */}
      {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full'
              >
                <Image
                  src={profile}
                  width={36}
                  height={36}
                  alt='Avatar'
                  className='overflow-hidden rounded-full'
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu> */}
      <div className="flex gap-4" data-oid="9hll_ad">
        <Sheet data-oid="1fbdopn">
          <SheetTrigger asChild data-oid="cypluxl">
            <Button
              size="icon"
              variant="outline"
              className="sm:hidden"
              data-oid="13cx7e8"
            >
              <PanelTop className="h-5 w-5" data-oid="3b2002g" />
              <span className="sr-only" data-oid="5zhx_g1">
                Toggle Menu
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="sm:max-w-xs" data-oid="qpexbgh">
            {/* Mobile Menu */}

            <nav
              className="grid gap-6 text-lg font-medium items-center justify-center"
              data-oid="g6d575:"
            >
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                data-oid="::wsp96"
              >
                <Home className="h-5 w-5" data-oid="qcbieu2" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                data-oid="z3.0_ad"
              >
                <ShoppingCart className="h-5 w-5" data-oid="bjgon.e" />
                Orders
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
                data-oid="puaic2y"
              >
                <Package className="h-5 w-5" data-oid="9-uuijy" />
                Products
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                data-oid="kva00w9"
              >
                <Users2 className="h-5 w-5" data-oid="5mzneuk" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                data-oid="o00rib2"
              >
                <Settings className="h-5 w-5" data-oid="s2tlsrv" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative flex-1 md:flex-initial" data-oid="gmtr_wq">
          <Search
            className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
            data-oid="ppao1.4"
          />

          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] md:justify-end"
            data-oid="9txto_f"
          />
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
