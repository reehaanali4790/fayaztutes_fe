"use client";

import React from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface MarketingLayoutProps {
  children: React.ReactNode;
  showPromoBar?: boolean;
}

export function MarketingLayout({ children, showPromoBar = false }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <SiteHeader showPromoBar={showPromoBar} />
      <main className="flex-1 w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
