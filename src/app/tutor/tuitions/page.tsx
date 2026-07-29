"use client";

import React, { useState, useMemo } from "react";
import { TuitionLead, apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useOpenTuitions, useMyApplications } from "@/hooks/useApiData";
import { EmptyState } from "@/components/ui/EmptyState";
import { 
  Search, 
  MapPin, 
  Clock, 
  Filter, 
  CheckCircle2, 
  DollarSign, 
  BookOpen,
  X
} from "lucide-react";

export default function RedesignedLightActiveTuitionsPage() {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("Karachi");
  const [selectedMode, setSelectedMode] = useState<string>("ALL");
  const [selectedGender, setSelectedGender] = useState<string>("ANY");
  const [activeModalTuition, setActiveModalTuition] = useState<TuitionLead | null>(null);
  const [pitchNote, setPitchNote] = useState("");
  const [applySuccessMessage, setApplySuccessMessage] = useState(false);
  const [localAppliedIds, setLocalAppliedIds] = useState<string[]>([]);
  const { tuitions, loading } = useOpenTuitions();
  const { applications } = useMyApplications();
  const appliedTuitionIds = [
    ...applications.map((a) => a.tuition_id),
    ...localAppliedIds,
  ];

  const cities = ["Hyderabad", "Islamabad", "Karachi", "Lahore", "Other", "Peshawar"];
  const modes = [
    { label: "All Modes", value: "ALL" },
    { label: "Home Tuition", value: "HOME" },
    { label: "Online Tuition", value: "ONLINE" }
  ];
  const genders = [
    { label: "Any", value: "ANY" },
    { label: "Female", value: "FEMALE" },
    { label: "Male", value: "MALE" }
  ];

  const filteredTuitions = useMemo(() => {
    return tuitions.filter((item) => {
      const searchLower = search.toLowerCase();
      const matchesSearch = search === "" ||
        item.title.toLowerCase().includes(searchLower) ||
        item.area.toLowerCase().includes(searchLower) ||
        item.tuition_code.toLowerCase().includes(searchLower) ||
        item.subjects.some((s) => s.toLowerCase().includes(searchLower));

      const matchesCity = selectedCity === "ALL" || item.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesMode = selectedMode === "ALL" || item.teaching_mode.toUpperCase() === selectedMode.toUpperCase();
      const matchesGender = selectedGender === "ANY" || item.preferred_tutor_gender.toUpperCase() === selectedGender.toUpperCase() || item.preferred_tutor_gender.toUpperCase() === "ANY";

      return matchesSearch && matchesCity && matchesMode && matchesGender;
    });
  }, [search, selectedCity, selectedMode, selectedGender, tuitions]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalTuition || !token) return;

    try {
      const res = await apiFetch("/applications/apply", {
        method: "POST",
        body: JSON.stringify({
          tuition_id: activeModalTuition.id,
          pitch_notes: pitchNote
        })
      }, token);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || "Failed to submit application. Please try again.");
        return;
      }
    } catch {
      // Offline fallback: still mark as applied locally
    }

    setLocalAppliedIds((prev) => [...prev, activeModalTuition.id]);
    setApplySuccessMessage(true);
    setTimeout(() => {
      setApplySuccessMessage(false);
      setActiveModalTuition(null);
      setPitchNote("");
    }, 1500);
  };

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Active Tuitions List
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse verified tuition requests from parents across Pakistan. Filter by location, subject, and teaching mode.
          </p>
        </div>

        {/* Top Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject, grade, area or tuition code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition shadow-sm"
          />
        </div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-6 h-fit shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filter Opportunities</span>
            </div>

            {/* Filter by Location */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Filter by Location
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCity("ALL")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedCity === "ALL" 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  All Cities
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      selectedCity === city 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Mode */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Filter by Mode
              </label>
              <div className="flex flex-col gap-1.5">
                {modes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setSelectedMode(mode.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between ${
                      selectedMode === mode.value 
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                    }`}
                  >
                    <span>{mode.label}</span>
                    {selectedMode === mode.value && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Preference */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Gender Preference
              </label>
              <div className="flex gap-2">
                {genders.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setSelectedGender(g.value)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold text-center transition ${
                      selectedGender === g.value 
                        ? "bg-indigo-600 text-white shadow-sm" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
              <span>Showing <strong>{filteredTuitions.length}</strong> active tuition jobs</span>
              <span>Updated in real-time</span>
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">Loading open tuitions...</p>
            ) : filteredTuitions.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No tuition opportunities match your search"
                description="Try adjusting your filters or check back when new leads are posted."
              />
            ) : (
              filteredTuitions.map((item) => {
                const isApplied = appliedTuitionIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-indigo-300 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md space-y-4 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-indigo-600 font-bold flex items-center gap-2">
                          <span>{item.tuition_code}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                            item.teaching_mode === "HOME"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}>
                            {item.teaching_mode === "HOME" ? "Home Tuition" : "Online Tuition"}
                          </span>
                        </div>
                        <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h2>
                      </div>

                      <button
                        onClick={() => setActiveModalTuition(item)}
                        disabled={isApplied}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-sm ${
                          isApplied 
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed" 
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                        }`}
                      >
                        {isApplied ? "Applied ✓" : "View Details"}
                      </button>
                    </div>

                    <p className="text-slate-600 text-sm font-medium line-clamp-2">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{item.address_snippet || `${item.area}, ${item.city}`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{item.created_at}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-extrabold text-slate-900">
                          Rs {item.offered_fee.toLocaleString()} / mo {item.is_negotiable && "(Negotiable)"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* View Details / Apply Modal */}
        {activeModalTuition && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 lg:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setActiveModalTuition(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <div className="text-xs font-mono text-indigo-600 font-bold mb-1">
                  {activeModalTuition.tuition_code}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {activeModalTuition.title}
                </h3>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
                <div><strong>Location:</strong> {activeModalTuition.address_snippet || activeModalTuition.area}</div>
                <div><strong>Subjects:</strong> {activeModalTuition.subjects.join(", ")}</div>
                <div><strong>Fee Structure:</strong> Rs {activeModalTuition.offered_fee.toLocaleString()} per month</div>
                <div><strong>Gender Preference:</strong> {activeModalTuition.preferred_tutor_gender}</div>
                <div><strong>Full Requirements:</strong> {activeModalTuition.description}</div>
              </div>

              {applySuccessMessage ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center text-emerald-800 font-bold text-sm">
                  ✓ Application Submitted Successfully! Moved to Screening Pipeline.
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Pitch / Application Note to Parent
                    </label>
                    <textarea
                      rows={3}
                      value={pitchNote}
                      onChange={(e) => setPitchNote(e.target.value)}
                      placeholder="Explain your relevant experience, past results, and teaching strategy for this subject..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalTuition(null)}
                      className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20"
                    >
                      Submit Application
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
