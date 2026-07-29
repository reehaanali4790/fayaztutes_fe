"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  Video,
  Users,
  GraduationCap,
  Award,
  Code,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";

export default function ServicesPage() {
  const services = [
    {
      title: "Home Tutoring (In-Person)",
      icon: MapPin,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      description: "One-on-one personalized tutoring at your home in Karachi, Lahore, and surrounding areas.",
      points: ["1-on-1 dedicated attention", "Flexible morning and evening slots", "2 Free Demo Classes included", "Matched within 24–48 hours"],
    },
    {
      title: "Online Tutoring (Virtual)",
      icon: Video,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description: "Live interactive 1-on-1 online sessions via Zoom and Google Meet for students worldwide.",
      points: ["Learn from top national teachers", "Recorded sessions and notes", "Interactive digital whiteboards", "2 Free Demo Classes included"],
    },
    {
      title: "100% Female Tutor Network",
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      description: "Guaranteed female tutor assignments for families requiring female educators.",
      points: ["100% female tutor guarantee", "CNIC and background checked", "Available for Home and Online", "All grades and subjects covered"],
    },
    {
      title: "Cambridge O and A Levels",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description: "Subject specialists for CAIE, Edexcel, and Aga Khan Board with past paper focus.",
      points: ["Math and Physics specialists", "Chemistry, Bio, CS", "Topical past papers", "Marking scheme mastery"],
    },
    {
      title: "MDCAT and ECAT Exam Prep",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      description: "Targeted competitive entry test coaching for MDCAT, ECAT, NUMS, and board exams.",
      points: ["Past paper practice", "Time management techniques", "Concept clarification", "Proven high score strategies"],
    },
    {
      title: "Skillset and Tech Development",
      icon: Code,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      description: "Practical skill coaching in Coding, Spoken English, Mental Math, and Languages.",
      points: ["Python and JavaScript", "Spoken English", "Mental Math", "Arabic and French"],
    },
  ];

  return (
    <MarketingLayout>
      <PageSection>
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              FayazTutes Service Offerings
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Academic Excellence for Every Need
            </h1>
            <p className="text-slate-600 text-sm">
              Explore our specialized tutoring services tailored to student grade levels, curricula, and learning formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-5 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl ${svc.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                    <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {svc.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/parent/post-tuition"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition text-center block shadow-sm"
                  >
                    Book 2 Free Demo Classes
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
