"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Search,
  Calendar,
  X
} from "lucide-react";

function PostTuitionWizardContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "O Level / Cambridge";
  const initialCity = searchParams.get("city") || "Karachi";
  const initialMode = searchParams.get("mode") || "HOME";

  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState(initialSubject.includes("O Level") ? "Cambridge O Level" : "Cambridge A Level");
  const [subjects, setSubjects] = useState(initialSubject);
  const [mode, setMode] = useState(initialMode);
  const [city, setCity] = useState(initialCity);
  const [area, setArea] = useState("DHA Phase 5");
  const [genderPref, setGenderPref] = useState("ANY");
  const [offeredFee, setOfferedFee] = useState("35000");
  const [submitted, setSubmitted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState("Sir Fayaz Ali");
  const [demoSuccess, setDemoSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("subject")) {
      setSubjects(searchParams.get("subject") || "");
    }
    if (searchParams.get("city")) {
      setCity(searchParams.get("city") || "");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(offeredFee) < 5000) {
      alert("Monthly tuition fee must be at least Rs 5,000 PKR.");
      return;
    }

    try {
      await fetch("http://localhost:8000/api/v1/tuitions/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Grade: ${grade} Subject: ${subjects}`,
          grade_level: grade,
          subjects: [subjects],
          curriculum: "Cambridge",
          teaching_mode: mode,
          city: city,
          area: area,
          preferred_tutor_gender: genderPref,
          offered_fee: parseInt(offeredFee),
          is_negotiable: true,
          description: `Tuition lead posted for ${grade} (${subjects}) in ${area}, ${city}.`
        })
      });
    } catch (err) {
      console.log("Mock lead submission saved locally");
    }

    setSubmitted(true);
  };

  const handleBookDemoModal = (tutorName: string) => {
    setSelectedTutor(tutorName);
    setShowDemoModal(true);
  };

  const handleConfirmDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setShowDemoModal(false);
      alert(`Demo class scheduled with ${selectedTutor}! Check your Parent Dashboard to launch Zoom session.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white">
            FT
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            FayazTutes
          </span>
        </Link>
        <Link href="/tutor" className="text-xs font-bold text-indigo-600 hover:underline">
          Switch to Tutor Portal $\rightarrow$
        </Link>
      </header>

      <main className="flex-1 p-6 lg:p-12 max-w-4xl mx-auto w-full">
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
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Grade / Academic Level</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Cambridge O Level">Cambridge O Level (IGCSE)</option>
                      <option value="Cambridge A Level">Cambridge A Level</option>
                      <option value="Primary & Junior Grades (1-5)">Primary & Junior Grades (1-5)</option>
                      <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                      <option value="Matric / FSc">Matric / Intermediate FSc</option>
                      <option value="MDCAT / ECAT Entry Test">MDCAT / ECAT Entry Test Prep</option>
                      <option value="Coding & Computer Skills">Coding & Skill Development</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Subjects Needed</label>
                    <input
                      type="text"
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value)}
                      placeholder="e.g. Mathematics, Physics, Chemistry, English"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
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
                        <option value="HOME">Home Tuition (In-Person)</option>
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
                    <div>• <strong>Level:</strong> {grade} ({subjects})</div>
                    <div>• <strong>Location:</strong> {area}, {city} ({mode} Tuition)</div>
                    <div>• <strong>Fee Offered:</strong> Rs {parseInt(offeredFee || "0").toLocaleString()} / month</div>
                    <div>• <strong>Guarantees Included:</strong> 2 Free Demo Classes + First Month Escrow Protection</div>
                  </div>
                </div>
              )}

              {/* Controls */}
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
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30"
                  >
                    Post Request & Match Tutors 🚀
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
              <p className="text-xs text-slate-600">Our engine matched top verified tutors in {area}, {city} for {subjects}.</p>
              <Link href="/parent/dashboard" className="inline-block mt-2 font-bold text-indigo-600 hover:underline text-xs">
                Go to Parent Portal Dashboard $\rightarrow$
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-indigo-200 p-6 rounded-3xl space-y-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                      FA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-lg">Sir Fayaz Ali</h3>
                        <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-extrabold text-xs">98% MATCH</span>
                      </div>
                      <p className="text-xs text-slate-600">Cambridge O/A Level Math & Physics Specialist • B.S. CS (8 Yrs Exp)</p>
                      <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mt-1">
                        <Star className="w-4 h-4 fill-amber-400" /> 4.9 Rating (24 Reviews) • {area}, {city}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBookDemoModal("Sir Fayaz Ali")}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                  >
                    Book 2 Free Demo Classes
                  </button>
                </div>
              </div>
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
                  Schedule Demo with {selectedTutor}
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
      </main>
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
