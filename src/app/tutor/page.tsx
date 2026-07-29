"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMyApplications, useTutorProfile } from "@/hooks/useApiData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PortalHero } from "@/components/layout/PortalHero";
import { ListFilter, Star } from "lucide-react";

export default function TutorHomePage() {
  const { user } = useAuth();
  const { applications } = useMyApplications();
  const { profile } = useTutorProfile();
  const activeApps = applications.filter((a) => !["HIRED", "REJECTED"].includes(a.status));

  return (
    <div className="space-y-8">
      <PortalHero
        label="Tutor Dashboard"
        title={`Welcome, ${user?.full_name || "Tutor"}`}
        description="Track your applications, manage demo classes, and explore new tuition leads."
        action={
          <Link href="/tutor/tuitions">
            <Button variant="secondary" className="bg-white text-indigo-900 hover:bg-slate-100">
              <ListFilter className="w-4 h-4" />
              Browse Active Tuitions
            </Button>
          </Link>
        }
      />

      <Card className="p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Your Profile Summary</h2>
        {profile ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
                {profile.rating_count > 0 ? profile.rating_avg.toFixed(1) : "—"}
                {profile.rating_count > 0 && <Star className="w-5 h-5 fill-amber-400 text-amber-400" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {profile.rating_count > 0
                  ? `Based on ${profile.rating_count} verified reviews`
                  : "No reviews yet"}
              </p>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong>{activeApps.length}</strong> active applications</div>
              <div><strong>{profile.experience_years}</strong> years experience</div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Complete your profile in Account Settings.</p>
        )}
      </Card>
    </div>
  );
}
