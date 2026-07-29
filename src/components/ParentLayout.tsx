"use client";

import React from "react";
import PortalShell, { NavItem } from "@/components/PortalShell";
import { useMyTuitionLeads } from "@/hooks/useApiData";

interface ParentLayoutProps {
  children: React.ReactNode;
}

export default function ParentLayout({ children }: ParentLayoutProps) {
  const { leads } = useMyTuitionLeads();

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/parent/dashboard" },
    { name: "Post Tuition", href: "/parent/post-tuition" },
    { name: "My Leads", href: "/parent/dashboard", badge: leads.length || undefined },
  ];

  return (
    <PortalShell portal="parent" navItems={navItems} accent="purple">
      {children}
    </PortalShell>
  );
}
