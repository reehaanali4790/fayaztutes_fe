"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import PortalShell, { NavItem } from "@/components/PortalShell";
import { useMyApplications, useTutorProfile } from "@/hooks/useApiData";
import { isTutorOnboardingPending, isTutorProfileIncomplete } from "@/lib/tutorOnboarding";

interface TutorLayoutProps {
  children: React.ReactNode;
}

export default function TutorLayout({ children }: TutorLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { applications } = useMyApplications();
  const { profile, loading } = useTutorProfile();
  const activeCount = applications.filter((a) => !["HIRED", "REJECTED"].includes(a.status)).length;

  useEffect(() => {
    if (loading || pathname === "/tutor/account") return;
    const needsOnboarding =
      isTutorOnboardingPending() || isTutorProfileIncomplete(profile);
    if (needsOnboarding) {
      router.replace("/tutor/account?onboarding=1");
    }
  }, [loading, pathname, profile, router]);

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
