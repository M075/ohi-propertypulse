// 'use client'
import React from "react";
import DashHeader from "@/assets/components/DashHeader";
import DashSideNav from "@/assets/components/DashSideNav";
import EditProductForm from "@/assets/components/EditProductForm";

const EditProductPage = () => {
  const breadcrumbsData = [
    { label: "Dashboard", link: "#" },
    { label: "Products", link: "/dashboard/products" },
    { label: "Edit Product", link: "/dashboard/products" },
  ];

  return (
    <div className="mt-20">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashSideNav />

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashHeader breadcrumbs={breadcrumbsData} />

          <EditProductForm />
        </div>
      </div>
    </div>
  );
};
export default EditProductPage;
