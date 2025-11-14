// app/layout.jsx - Updated
import React from "react";
import {
  Inter,
  Manrope,
  Zalando_Sans_SemiExpanded,
  Raleway
} from "next/font/google";
import "@/assets/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/assets/components/Footer";
import AuthProvider from "@/assets/components/authProvider";
import { CartProvider } from "@/assets/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/assets/components/Navbar2";
import DisableZoom from "@/app/DisableZoom";

const font = Zalando_Sans_SemiExpanded({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Ohi! | Pitch. Persuade. Procure",
  description: "Find home businesses near you or anywhere around South Africa.",
  keywords:
    "home businesses, home industry, home stores, home store near me, home business near me, home store near me",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ohi!',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#059669',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <html suppressHydrationWarning>
          <body suppressHydrationWarning className={font.className}>
            <ThemeProvider attribute="class">
              <DisableZoom />
              <Navbar/>
              <div suppressHydrationWarning>{children}</div>
              <Footer />
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </CartProvider>
    </AuthProvider>
  );
};

export default MainLayout;