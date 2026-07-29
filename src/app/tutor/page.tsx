"use client";

import React from "react";
import Link from "next/link";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useMyApplications, useTutorProfile } from "@/hooks/useApiData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ListFilter, Star } from "lucide-react";

export default function TutorHomePage() {
  const { user } = useAuth();
  const { applications } = useMyApplications();
  const { profile } = useTutorProfile();
  const activeApps = applications.filter((a) => !["HIRED", "REJECTED"].includes(a.status));

  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 lg:p-8 rounded-2xl shadow-xl">
            <p className="text-xs font-bold text-indigo-100 uppercase tracking-wider mb-2">Tutor Dashboard</p>
            <h1 className="text-3xl font-extrabold">Welcome, {user?.full_name || "Tutor"}</h1>
            <p className="text-indigo-100 text-sm mt-2 max-w-xl">
              Track your applications, manage demo classes, and explore new tuition leads.
            </p>
            <Link href="/tutor/tuitions" className="inline-block mt-4">
              <Button variant="secondary" className="bg-white text-indigo-900 hover:bg-slate-100">
                <ListFilter className="w-4 h-4" />
                Browse Active Tuitions
              </Button>
            </Link>
          </div>

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
      </TutorLayout>
    </ProtectedRoute>
  );
}
