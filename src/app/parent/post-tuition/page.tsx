"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Search,
  Calendar,
  X,
  GraduationCap
} from "lucide-react";
import { apiFetch, MatchRecommendation } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useMatchRecommendations } from "@/hooks/useApiData";
import { EmptyState } from "@/components/ui/EmptyState";
import { SubjectPicker } from "@/components/catalog/SubjectPicker";
import { useCatalog } from "@/hooks/useCatalog";

function PostTuitionWizardContent() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const initialGradeLevelId = searchParams.get("grade_level_id") || "o_level";
  const initialSubjectIds = searchParams.get("subject_ids")?.split(",").filter(Boolean) || [];

  const [step, setStep] = useState(1);
  const [gradeLevelId, setGradeLevelId] = useState(initialGradeLevelId);
  const [subjectIds, setSubjectIds] = useState<string[]>(initialSubjectIds);
  const { findGrade, findCurriculumForGrade, subjectName } = useCatalog();
  const initialCity = searchParams.get("city") || "Karachi";
  const initialMode = searchParams.get("mode") || "HOME";
  const [mode, setMode] = useState(initialMode);
  const [city, setCity] = useState(initialCity);
  const [genderPref, setGenderPref] = useState("ANY");
  const [offeredFee, setOfferedFee] = useState("35000");
  const [submitted, setSubmitted] = useState(false);
  const [submittedTuitionId, setSubmittedTuitionId] = useState<string | null>(null);
  const { matches, loading: matchesLoading } = useMatchRecommendations(submittedTuitionId);
  const [submitError, setSubmitError] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchRecommendation | null>(null);
  const [demoSuccess, setDemoSuccess] = useState(false);

  const [area, setArea] = useState("DHA Phase 5");

  useEffect(() => {
    const g = searchParams.get("grade_level_id");
    const s = searchParams.get("subject_ids");
    if (g) setGradeLevelId(g);
    if (s) setSubjectIds(s.split(",").filter(Boolean));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fee = parseInt(offeredFee, 10);
    if (isNaN(fee) || fee < 5000) {
      alert("Monthly tuition fee must be at least Rs 5,000 PKR.");
      return;
    }

    if (!token || !isAuthenticated) {
      setSubmitError("Please sign in as a parent to post a tuition request.");
      router.push("/auth/login");
      return;
    }

    if (subjectIds.length === 0) {
      alert("Please select at least one subject from the catalog.");
      return;
    }

    setSubmitError("");
    const gradeLabel = findGrade(gradeLevelId)?.label || gradeLevelId;
    const curriculum = findCurriculumForGrade(gradeLevelId)?.label || "Pakistan";
    const subjectNames = subjectIds.map((id) => subjectName(id));
    const payload = {
      title: `${gradeLabel}: ${subjectNames.join(", ")}`,
      grade_level_id: gradeLevelId,
      grade_level: gradeLabel,
      subject_ids: subjectIds,
      subjects: subjectNames,
      curriculum,
      teaching_mode: mode,
      city: city,
      area: area,
      preferred_tutor_gender: genderPref,
      offered_fee: fee,
      is_negotiable: true,
      description: `Tuition lead for ${gradeLabel} (${subjectNames.join(", ")}) in ${area}, ${city}.`
    };

    try {
      const res = await apiFetch("/tuitions/post", {
        method: "POST",
        body: JSON.stringify(payload)
      }, token);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSubmitError(err.detail || "Failed to post tuition request. Please try again.");
        return;
      }

      const created = await res.json();
      setSubmittedTuitionId(created.id);
      setSubmitted(true);
    } catch {
      setSubmitError("Unable to reach the server. Please check your connection and try again.");
    }
  };

  const handleBookDemoModal = (match: MatchRecommendation) => {
    setSelectedMatch(match);
    setShowDemoModal(true);
  };

  const handleConfirmDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setShowDemoModal(false);
      alert(`Demo booking is available from your Parent Dashboard once tutors apply to your lead.`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
        {!submitted ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-10 space-y-8 shadow-xl animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Parents & Students Portal
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Find Your Perfect Home or Online Tutor
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Post your tuition requirements in 3 easy steps. Get matched with top verified tutors and claim 2 free demo classes.
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full z-0" />
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-all ${
                    step === s
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-110"
                      : step > s
                      ? "bg-emerald-500 text-white font-extrabold"
                      : "bg-white text-slate-400 border border-slate-300"
                  }`}
                >
                  {step > s ? "✓" : s}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900">Step 1: Academic Requirements</h3>
                  <SubjectPicker
                    gradeLevelId={gradeLevelId}
                    subjectIds={subjectIds}
                    onGradeLevelChange={setGradeLevelId}
                    onSubjectIdsChange={setSubjectIds}
                    initialCurriculumId={findCurriculumForGrade(gradeLevelId)?.id}
                  />
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900">Step 2: Location & Preferred Mode</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Teaching Mode</label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900"
                      >
                        <option value="HOME">Visiting Clients (In-Person)</option>
                        <option value="ONLINE">Online Tuition (Zoom / Meet)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Tutor Gender Preference</label>
                      <select
                        value={genderPref}
                        onChange={(e) => setGenderPref(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900"
                      >
                        <option value="ANY">Any Gender</option>
                        <option value="FEMALE">Female Tutor Only</option>
                        <option value="MALE">Male Tutor Only</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Area / Location</label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. DHA Phase 5, Clifton, Gulberg"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900">Step 3: Offered Budget & Final Submit</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Expected Monthly Fee (PKR - Min 5,000)</label>
                    <input
                      type="number"
                      min="5000"
                      value={offeredFee}
                      onChange={(e) => setOfferedFee(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 font-bold"
                      required
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                    <div className="font-bold text-indigo-700">Request Summary:</div>
                    <div>• <strong>Level:</strong> {findGrade(gradeLevelId)?.label || gradeLevelId} ({subjectIds.map((id) => subjectName(id)).join(", ")})</div>
                    <div>• <strong>Location:</strong> {area}, {city} ({mode} Tuition)</div>
                    <div>• <strong>Fee Offered:</strong> Rs {parseInt(offeredFee || "0").toLocaleString()} / month</div>
                    <div>• <strong>Guarantees Included:</strong> 2 Free Demo Classes + First Month Escrow Protection</div>
                  </div>
                </div>
              )}

              {/* Controls */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl">
                  {submitError}
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && subjectIds.length === 0) {
                        alert("Please select at least one subject.");
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30"
                  >
                    Post Request and Match Tutors
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* AI Matched Tutors Feed */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Request Submitted Successfully!
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">AI Matched Recommended Tutors</h2>
              <p className="text-xs text-slate-600">Our engine matched top verified tutors in {area}, {city} for {subjectIds.map((id) => subjectName(id)).join(", ")}.</p>
              <Link href="/parent/dashboard" className="inline-block mt-2 font-bold text-indigo-600 hover:underline text-xs">
                Go to Parent Portal Dashboard $\rightarrow$
              </Link>
            </div>

            <div className="space-y-4">
              {matchesLoading ? (
                <p className="text-sm text-slate-500 text-center">Finding matched tutors...</p>
              ) : matches.length === 0 ? (
                <EmptyState
                  icon={GraduationCap}
                  title="We're matching tutors"
                  description="Check back soon on your dashboard — verified tutors in your area will be notified."
                  actionLabel="Go to Dashboard"
                  actionHref="/parent/dashboard"
                />
              ) : (
                matches.slice(0, 5).map((match) => (
                  <div key={match.tutor_id} className="bg-white border border-indigo-200 p-6 rounded-2xl space-y-4 shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-lg">
                            {match.headline || "Verified Tutor"}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-extrabold text-xs">
                            {match.match_score}% MATCH
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {match.education_level} — {match.experience_years} yrs exp — {match.area || match.city}
                        </p>
                        {match.rating_count > 0 && (
                          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mt-1">
                            <Star className="w-4 h-4 fill-amber-400" /> {match.rating_avg} ({match.rating_count} reviews)
                          </div>
                        )}
                        {match.match_reasons.length > 0 && (
                          <p className="text-xs text-slate-500 mt-2">{match.match_reasons.join(" · ")}</p>
                        )}
                      </div>
                      <Link href="/parent/dashboard" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shrink-0">
                        View on Dashboard
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Demo Booking Modal */}
        {showDemoModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setShowDemoModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  2 Free Demo Classes Booking
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Schedule Demo
                </h3>
              </div>

              {demoSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center text-emerald-800 font-bold text-sm">
                  ✓ Demo Class Booked! Check Parent Dashboard.
                </div>
              ) : (
                <form onSubmit={handleConfirmDemo} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="text"
                      defaultValue="Tomorrow, July 29"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Preferred Time</label>
                    <input
                      type="text"
                      defaultValue="05:00 PM PKT"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDemoModal(false)}
                      className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                    >
                      Confirm Demo Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
    </div>
  );
}

export default function RedesignedLightPostTuitionWizardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading FayazTutes Wizard...</div>}>
      <PostTuitionWizardContent />
    </Suspense>
  );
}
