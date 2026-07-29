"use client";

import React from "react";
import PortalShell, { NavItem } from "@/components/PortalShell";

interface ParentLayoutProps {
  children: React.ReactNode;
}

export default function ParentLayout({ children }: ParentLayoutProps) {
  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/parent/dashboard" },
    { name: "Post Tuition", href: "/parent/post-tuition" },
  ];

  return (
    <PortalShell portal="parent" navItems={navItems} accent="purple">
      {children}
    </PortalShell>
  );
}
