import React from "react";
import ProfileDetail from "@/assets/components/ProfileDetail";
import DashHeader from "@/assets/components/DashHeader";
import DashSideNav from "@/assets/components/DashSideNav";

const ProfilePage = () => {
  const breadcrumbsData = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Profile", link: "/dashboard/profile" },
    { label: "Edit Profile", link: "/dashboard/profile" },
  ];

  return (
    <div>
      <div className="mt-20">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <DashSideNav />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <DashHeader breadcrumbs={breadcrumbsData} />
            <ProfileDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
