"use client";

import React from "react";
import PortalShell, { NavItem } from "@/components/PortalShell";
import { useMyApplications } from "@/hooks/useApiData";

interface TutorLayoutProps {
  children: React.ReactNode;
}

export default function TutorLayout({ children }: TutorLayoutProps) {
  const { applications } = useMyApplications();
  const activeCount = applications.filter((a) => !["HIRED", "REJECTED"].includes(a.status)).length;

  const navItems: NavItem[] = [
    { name: "Home", href: "/tutor" },
    { name: "My Tuitions", href: "/tutor/my-tuitions", badge: activeCount || undefined },
    { name: "Demo Sessions", href: "/tutor/demos" },
    { name: "Active Tuitions", href: "/tutor/tuitions" },
    { name: "Status Tracking", href: "/tutor/status-tracking" },
    { name: "Hired Tuitions", href: "/tutor/hired" },
    { name: "Edit Profile", href: "/tutor/account" },
  ];

  return (
    <PortalShell portal="tutor" navItems={navItems}>
      {children}
    </PortalShell>
  );
}
