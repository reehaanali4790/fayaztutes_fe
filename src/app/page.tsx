"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePublicStats, useFeaturedTutors } from "@/hooks/useApiData";
import { EmptyState } from "@/components/ui/EmptyState";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { LandingHero } from "@/components/marketing/LandingHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";
import { TrustBadges } from "@/components/marketing/TrustBadges";
import { CatalogSearchSelect } from "@/components/catalog/SubjectPicker";
import {
  Search,
  Star,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default function RedesignedLightLandingPage() {
  const router = useRouter();
  const stats = usePublicStats();
  const { tutors: featuredTutors, loading: tutorsLoading } = useFeaturedTutors(3);

  const [gradeLevelId, setGradeLevelId] = useState("o_level");
  const [searchSubjectId, setSearchSubjectId] = useState("");
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedMode] = useState("HOME");

  const popularSearches = [
    { label: "O Level Mathematics", grade: "o_level", subject: "mathematics" },
    { label: "A Level Physics", grade: "a_level", subject: "physics" },
    { label: "MDCAT Prep", grade: "mdcat", subject: "mdcat_biology" },
    { label: "Primary Grades 1–3", grade: "primary_1_3", subject: "" },
    { label: "Matric Science", grade: "matric_9_10", subject: "physics" },
    { label: "Quran & Islamic Studies", grade: "primary_1_3", subject: "quran_studies" },
  ];

  const tutorBadgeText =
    stats && stats.tutor_count > 0
      ? `${stats.tutor_count.toLocaleString()}+ Background-Verified Tutors`
      : "Background-Verified Home & Online Tutors";

  const getInitials = (name?: string) => {
    if (!name) return "T";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (gradeLevelId) query.set("grade_level_id", gradeLevelId);
    if (searchSubjectId) query.set("subject_ids", searchSubjectId);
    if (selectedCity) query.set("city", selectedCity);
    if (selectedMode) query.set("mode", selectedMode);
    router.push(`/parent/post-tuition?${query.toString()}`);
  };

  return (
    <MarketingLayout showPromoBar>
      <LandingHero badgeText={tutorBadgeText}>
        <form
          onSubmit={handleHeroSearch}
          className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 px-1">
                Grade & Subject
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 z-10 pointer-events-none" />
                <div className="pl-8">
                  <CatalogSearchSelect
                    gradeLevelId={gradeLevelId}
                    subjectId={searchSubjectId}
                    onGradeLevelChange={setGradeLevelId}
                    onSubjectIdChange={setSearchSubjectId}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 px-1">
                City / Region
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Online">Online Worldwide</option>
              </select>
            </div>

            <div className="sm:col-span-4 flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find Tutors Now
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-500 mr-1">Popular:</span>
            {popularSearches.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setGradeLevelId(item.grade);
                  setSearchSubjectId(item.subject);
                  const q = new URLSearchParams({
                    grade_level_id: item.grade,
                    city: selectedCity,
                  });
                  if (item.subject) q.set("subject_ids", item.subject);
                  router.push(`/parent/post-tuition?${q.toString()}`);
                }}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition border border-slate-200/80"
              >
                {item.label}
              </button>
            ))}
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-2xl font-extrabold text-amber-500">
              {stats && stats.avg_rating > 0 ? stats.avg_rating.toFixed(1) : "—"}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              {stats && stats.avg_rating > 0 ? "Average Tutor Rating" : "Quality-First Matching"}
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-2xl font-extrabold text-indigo-600">2 Free Demos</div>
            <div className="text-xs text-slate-600 font-medium">No Commitment Trial</div>
          </div>
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-2xl font-extrabold text-emerald-600">Escrow Safe</div>
            <div className="text-xs text-slate-600 font-medium">100% Fee Protection</div>
          </div>
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-2xl font-extrabold text-purple-600">
              {stats && stats.family_count > 0 ? `${stats.family_count.toLocaleString()}+` : "Growing"}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              {stats && stats.family_count > 0 ? "Families Matched" : "Community of Families"}
            </div>
          </div>
        </div>
      </LandingHero>

      <PageSection variant="white">
        <AnimatedSection>
          <TrustBadges />
        </AnimatedSection>
      </PageSection>

      <PageSection id="featured" variant="white">
        <AnimatedSection>
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                  Verified Educator Spotlight
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Top Rated Tutors Available Now
                </h2>
              </div>
              <Link
                href="/parent/post-tuition"
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                {stats && stats.tutor_count > 0
                  ? `Browse ${stats.tutor_count}+ Tutors`
                  : "Post a Tuition Request"}{" "}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {tutorsLoading ? (
              <p className="text-sm text-slate-500 text-center">Loading featured tutors...</p>
            ) : featuredTutors.length === 0 ? (
              <EmptyState
                icon={GraduationCap}
                title="Be among our first verified educators"
                description="We're building a trusted network of tutors across Pakistan."
                actionLabel="Tutor Sign Up"
                actionHref="/auth/signup/tutor"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 hover:shadow-xl transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                            {getInitials(tutor.full_name)}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                              {tutor.full_name || "Verified Tutor"}
                            </h3>
                            {tutor.rating_count > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <span>{tutor.rating_avg}</span>
                                <span className="text-slate-400 font-normal">
                                  ({tutor.rating_count} reviews)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {tutor.cnic_verified && (
                          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {tutor.headline ||
                          `${tutor.education_level} — ${tutor.experience_years} yrs experience`}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(tutor.subjects || []).slice(0, 4).map((sub) => (
                          <span
                            key={sub}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">{tutor.area || tutor.city}</span>
                        <span className="font-bold text-slate-900">
                          {tutor.monthly_rate_expected > 0
                            ? `Rs ${tutor.monthly_rate_expected.toLocaleString()} / mo`
                            : "Rate on request"}
                        </span>
                      </div>
                      <Link
                        href={`/parent/post-tuition?grade_level_id=o_level&subject_ids=${encodeURIComponent((tutor.subject_ids || [])[0] || "mathematics")}&city=${encodeURIComponent(tutor.city)}`}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-600/20 text-center block"
                      >
                        Book 2 Free Demo Classes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </PageSection>

      <PageSection id="how-it-works" variant="muted">
        <AnimatedSection>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Simple 4-Step Journey
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                How FayazTutes Works for Families
              </h2>
              <p className="text-slate-600 text-sm">
                We eliminate risk and hassle with background-checked tutors and managed escrow protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { n: 1, color: "bg-indigo-100 text-indigo-600", title: "Post Your Request", desc: "Tell us your subject, grade level, city, and preferred tuition budget." },
                { n: 2, color: "bg-purple-100 text-purple-600", title: "Get Matched", desc: "Our engine matches top verified tutors in your area within 24 hours." },
                { n: 3, color: "bg-amber-100 text-amber-600", title: "2 Free Demo Classes", desc: "Evaluate teaching style and subject mastery with 2 risk-free trial classes." },
                { n: 4, color: "bg-emerald-100 text-emerald-600", title: "Escrow Safe Learning", desc: "1st month fee held in 30-day escrow for complete parent peace of mind." },
              ].map((step) => (
                <div
                  key={step.n}
                  className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 text-center shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center font-extrabold text-xl mx-auto`}>
                    {step.n}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/how-it-works"
                className="text-sm font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                Learn more about our process <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </PageSection>

      <PageSection variant="white">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-10 lg:p-14 text-center text-white space-y-5 shadow-xl shadow-indigo-600/20">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to find the right tutor?
            </h2>
            <p className="text-indigo-100 text-sm max-w-lg mx-auto">
              Post your tuition request in under 2 minutes. Get matched with verified tutors and try 2 free demo classes before you commit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/parent/post-tuition"
                className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-extrabold text-sm hover:bg-indigo-50 transition shadow-lg"
              >
                Request a Tutor
              </Link>
              <Link
                href="/faq"
                className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition"
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </PageSection>
    </MarketingLayout>
  );
}
