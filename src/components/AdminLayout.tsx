"use client";

import React from "react";
import PortalShell, { NavItem } from "@/components/PortalShell";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNav: NavItem[] = [
  { name: "Operations Console", href: "/admin" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <PortalShell portal="admin" navItems={adminNav} accent="indigo">
      {children}
    </PortalShell>
  );
}
