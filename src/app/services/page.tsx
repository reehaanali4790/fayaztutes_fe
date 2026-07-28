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
  ArrowRight, 
  Sparkles,
  Phone
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Home Tutoring (In-Person)",
      icon: MapPin,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      description: "One-on-one personalized tutoring at your home in Karachi (DHA, Clifton, PECHS, Gulshan) and Lahore (DHA, Gulberg, Model Town).",
      points: ["1-on-1 dedicated attention", "Flexible morning & evening slots", "2 Free Demo Classes included", "Matched within 24–48 hours"]
    },
    {
      title: "Online Tutoring (Virtual)",
      icon: Video,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description: "Live interactive 1-on-1 online sessions via Zoom & Google Meet for students across Pakistan, Gulf, UK, and USA.",
      points: ["Learn from top national teachers", "Recorded sessions & notes", "Interactive digital whiteboards", "2 Free Demo Classes included"]
    },
    {
      title: "100% Female Tutor Network",
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      description: "Guaranteed female tutor assignments for families requiring female educators for cultural, religious, or personal preference.",
      points: ["100% female tutor guarantee", "CNIC & background checked", "Available for Home & Online", "All grades & subjects covered"]
    },
    {
      title: "Cambridge O & A Levels",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description: "Subject specialists for CAIE, Edexcel, and Aga Khan Board (AKU-EB). Deep focus on topical past papers, marking schemes & exam technique.",
      points: ["Math (4024/9709) & Physics (5054/9702)", "Chemistry, Bio, CS (2210/9618)", "Topical past papers (2015-2025)", "Marking scheme mastery"]
    },
    {
      title: "MDCAT & ECAT Exam Prep",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      description: "Targeted competitive entry test coaching for MDCAT (PMC), ECAT (UET/NED), NUMS, IBA NTS, SAT, and Matric/FSc board exams.",
      points: ["Past paper practice & shortcuts", "Time management techniques", "Concept clarification", "Proven high score strategies"]
    },
    {
      title: "Skillset & Tech Development",
      icon: Code,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      description: "Practical skill coaching by industry practitioners in Coding (Python, Web Dev), Spoken English, Mental Math, and Languages.",
      points: ["Python & JavaScript for kids & teens", "Spoken English & public speaking", "Mental Math & Abacus", "Arabic & French languages"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 lg:px-12 py-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-xl">
            FT
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            FayazTutes
          </span>
        </Link>
        <Link href="/parent/post-tuition" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20">
          Request a Tutor 🚀
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div 
                key={svc.title}
                className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-5 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${svc.color} border flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>

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
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition text-center block"
                >
                  Book 2 Free Demo Classes
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs px-6 lg:px-12 py-8 text-center border-t border-slate-800">
        © 2026 FayazTutes Platform. All rights reserved. Head Office: DHA Phase 5, Karachi.
      </footer>
    </div>
  );
}
