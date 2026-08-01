"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  apiFetch,
  uploadResumeForParsing,
  uploadDegreeCertificate,
  type CertificateEntry,
  type EducationEntry,
  type WorkExperienceEntry,
  type BoardQualificationEntry,
  type ResumeParseResult,
} from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useTutorProfile } from "@/hooks/useApiData";
import {
  ShieldCheck,
  X,
  CheckCircle2,
  CreditCard,
  Upload,
  FileText,
  Loader2,
  Plus,
  Trash2,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  IdCard,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import {
  BOARD_OPTIONS,
  PAKISTANI_BOARDS,
  getSubjectsForBoard,
  getGroupsForBoard,
  type BoardId,
} from "@/lib/pakistaniBoards";
import { SubjectPicker } from "@/components/catalog/SubjectPicker";
import {
  clearTutorOnboardingPending,
  isTutorOnboardingPending,
  isTutorProfileIncomplete,
} from "@/lib/tutorOnboarding";
import {
  AVAILABILITY_MODES,
  QUALIFICATION_TYPES,
  TEACHING_CLASS_LEVELS,
  TEACHING_SYSTEMS,
} from "@/lib/teachingOptions";

function SectionCard({
  title,
  icon: Icon,
  children,
  action,
  hint,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  action?: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Icon className="w-4 h-4 text-indigo-600" />
            {title}
          </div>
          {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

const MONTHS = [
  { v: 1, l: "Jan" }, { v: 2, l: "Feb" }, { v: 3, l: "Mar" }, { v: 4, l: "Apr" },
  { v: 5, l: "May" }, { v: 6, l: "Jun" }, { v: 7, l: "Jul" }, { v: 8, l: "Aug" },
  { v: 9, l: "Sep" }, { v: 10, l: "Oct" }, { v: 11, l: "Nov" }, { v: 12, l: "Dec" },
];

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export default function AccountSettingsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading profile...</div>}>
      <AccountSettingsContent />
    </React.Suspense>
  );
}

function AccountSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOnboarding =
    searchParams.get("onboarding") === "1" || isTutorOnboardingPending();
  const { token, user } = useAuth();
  const { profile, loading, setProfile } = useTutorProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const degreeInputRef = useRef<HTMLInputElement>(null);

  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("Karachi");
  const [cnic, setCnic] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [gradeLevelId, setGradeLevelId] = useState("o_level");
  const [subjectIds, setSubjectIds] = useState<string[]>([]);
  const [teachingGradeIds, setTeachingGradeIds] = useState<string[]>([]);
  const [teachingSystems, setTeachingSystems] = useState<string[]>([]);
  const [teachingClassLevels, setTeachingClassLevels] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [certificates, setCertificates] = useState<CertificateEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([]);
  const [boardQualifications, setBoardQualifications] = useState<BoardQualificationEntry[]>([]);
  const [mode, setMode] = useState("BOTH");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [resumeFilename, setResumeFilename] = useState<string | null>(null);
  const [degreeFilename, setDegreeFilename] = useState<string | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parseSuccess, setParseSuccess] = useState(false);
  const [degreeUploading, setDegreeUploading] = useState(false);
  const [degreeError, setDegreeError] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!profile) return;
    setHeadline(profile.headline || "");
    setBio(profile.bio || "");
    setCity(profile.city || "Karachi");
    setCnic(profile.cnic_number || "");
    setExperienceYears(profile.experience_years ?? 0);
    setSubjectIds(profile.subject_ids || []);
    setTeachingGradeIds(profile.teaching_grade_ids || []);
    if (profile.teaching_grade_ids?.[0]) setGradeLevelId(profile.teaching_grade_ids[0]);
    setTeachingSystems(profile.teaching_systems || []);
    setTeachingClassLevels(profile.teaching_class_levels || []);
    setSkills(profile.skills || []);
    setCertificates(profile.certificates || []);
    setEducation(profile.education || []);
    setWorkExperience(profile.work_experience || []);
    setBoardQualifications(profile.board_qualifications || []);
    setMode(profile.preferred_mode || "BOTH");
    setBankName(profile.bank_name || "");
    setAccountNumber(profile.bank_account_number || "");
    setAccountTitle(profile.account_title || "");
    setResumeFilename(profile.resume_filename || null);
    setDegreeFilename(profile.degree_certificate_filename || null);
  }, [profile]);

  const applyParseResult = (parsed: ResumeParseResult) => {
    if (parsed.headline) setHeadline(parsed.headline);
    if (parsed.bio) setBio(parsed.bio);
    if (parsed.experience_years) setExperienceYears(parsed.experience_years);
    if (parsed.city) setCity(parsed.city);
    if (parsed.skills?.length) setSkills(parsed.skills);
    if (parsed.certificates?.length) setCertificates(parsed.certificates);
    if (parsed.education?.length) setEducation(parsed.education);
    if (parsed.work_experience?.length) setWorkExperience(parsed.work_experience);
    if (parsed.board_qualifications?.length) setBoardQualifications(parsed.board_qualifications);
    if (parsed.subject_ids?.length) {
      setSubjectIds((prev) => [...new Set([...prev, ...parsed.subject_ids!])]);
    } else if (parsed.subjects_can_teach?.length) {
      setSubjectIds((prev) => [...new Set([...prev, ...parsed.subjects_can_teach])]);
    }
    if (parsed.resume_filename) setResumeFilename(parsed.resume_filename);
    setParseSuccess(true);
    setTimeout(() => setParseSuccess(false), 5000);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setParsing(true);
    setParseError("");
    try {
      const parsed = await uploadResumeForParsing(file, token);
      applyParseResult(parsed);
      const res = await apiFetch("/tutors/me/profile", {}, token);
      if (res.ok) setProfile(await res.json());
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Failed to parse resume");
    } finally {
      setParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDegreeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setDegreeUploading(true);
    setDegreeError("");
    try {
      const result = await uploadDegreeCertificate(file, token);
      setDegreeFilename(result.degree_certificate_filename);
      setCertificates(result.certificates || []);
    } catch (err) {
      setDegreeError(err instanceof Error ? err.message : "Failed to upload certificate");
    } finally {
      setDegreeUploading(false);
      if (degreeInputRef.current) degreeInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");

    if (isOnboarding) {
      if (!headline.trim() && !bio.trim()) {
        setSaveError("Add a headline or short bio so parents know who you are.");
        return;
      }
      if (subjectIds.length === 0) {
        setSaveError("Select at least one subject you can teach.");
        return;
      }
      if (teachingSystems.length === 0) {
        setSaveError("Select at least one teaching system (Cambridge / IGCSE / AKUB / Matric).");
        return;
      }
      if (teachingClassLevels.length === 0) {
        setSaveError("Select at least one class / grade level you want to teach.");
        return;
      }
    }

    try {
      const res = await apiFetch(
        "/tutors/me/profile",
        {
          method: "PUT",
          body: JSON.stringify({
            headline,
            bio,
            city,
            cnic_number: cnic || null,
            experience_years: experienceYears,
            subject_ids: subjectIds,
            teaching_grade_ids: teachingGradeIds.length ? teachingGradeIds : [gradeLevelId],
            teaching_systems: teachingSystems,
            teaching_class_levels: teachingClassLevels,
            skills,
            certificates,
            education: education.map((e) => ({
              ...e,
              subjects: (e.subjects || []).map((s) => s.trim()).filter(Boolean).slice(0, 3),
            })),
            work_experience: workExperience,
            board_qualifications: boardQualifications,
            preferred_mode: mode,
            bank_name: bankName,
            bank_account_number: accountNumber,
            account_title: accountTitle,
          }),
        },
        token
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(typeof err.detail === "string" ? err.detail : "Failed to save profile");
      }
      const updated = await res.json();
      setProfile(updated);
      setSavedSuccess(true);
      if (isOnboarding && !isTutorProfileIncomplete(updated)) {
        clearTutorOnboardingPending();
        setTimeout(() => router.push("/tutor"), 1200);
      } else {
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      const res = await apiFetch(
        "/auth/change-password",
        { method: "POST", body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }) },
        token
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setPasswordError(err.detail || "Failed to update password.");
        return;
      }
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setPasswordError("Unable to reach the server.");
    }
  };

  const addEducation = () =>
    setEducation([
      ...education,
      { board: "UNIVERSITY", institution: "", subjects: ["", "", ""], group: null, year_completed: null, grade_or_result: null },
    ]);

  const addCertificate = () => setCertificates([...certificates, { name: "", issuer: "", year: undefined }]);

  const addExperience = () =>
    setWorkExperience([
      ...workExperience,
      { title: "", organization: "", description: "", is_current: false, start_month: null, end_month: null },
    ]);

  const addBoardQual = () =>
    setBoardQualifications([...boardQualifications, { board: "O_LEVEL", group: null, subjects: [] }]);

  const displayName = user?.full_name || "Tutor";

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isOnboarding ? "Complete Your Tutor Profile" : "Edit Profile"}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isOnboarding
            ? "Fill in education, experience, teaching level, availability, CNIC, and certificates so parents can trust you."
            : "Upload your resume to auto-fill, or complete each section manually."}
        </p>
      </div>

      {isOnboarding && (
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-indigo-900 text-sm">
          <strong>Onboarding:</strong> Complete the sections below — especially education, teaching level, subjects, and availability.
        </div>
      )}

      {loading && <p className="text-sm text-slate-500">Loading profile...</p>}

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 font-bold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Profile saved successfully!
        </div>
      )}
      {saveError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-700 font-bold text-sm">{saveError}</div>
      )}
      {parseSuccess && (
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-indigo-800 font-bold text-sm flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Resume parsed! Review the sections below and save when ready.
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <SectionCard title="Resume / CV Upload" icon={FileText}>
          <p className="text-xs text-slate-600">
            Upload PDF or DOCX — we extract skills, education, and experience. You can edit everything after.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleResumeUpload} className="hidden" id="resume-upload" />
            <label
              htmlFor="resume-upload"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs cursor-pointer transition ${
                parsing ? "bg-slate-100 text-slate-400" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              }`}
            >
              {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {parsing ? "Parsing..." : "Upload & Parse Resume"}
            </label>
            {resumeFilename && (
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> {resumeFilename}
              </span>
            )}
          </div>
          {parseError && <p className="text-xs font-bold text-red-600">{parseError}</p>}
        </SectionCard>

        <SectionCard title="Account & CNIC" icon={IdCard}>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar name={displayName} size="lg" />
              {profile?.cnic_verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{displayName}</h2>
              <p className="text-xs text-slate-500">{user?.email}</p>
              {profile?.cnic_verified ? (
                <p className="text-[11px] font-bold text-emerald-700 mt-1">CNIC verified</p>
              ) : (
                <p className="text-[11px] text-amber-700 mt-1">CNIC pending admin verification</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Professional Headline</label>
              <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. O/A Level Physics Specialist" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                {["Karachi", "Lahore", "Islamabad", "Hyderabad", "Peshawar", "Other"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Tutor CNIC *</label>
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="42101-1234567-1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono"
              />
              <p className="text-[10px] text-slate-500">13-digit CNIC. Used for verification — never shown publicly.</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Bio / About</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Brief professional summary..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs resize-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Years of Teaching Experience</label>
              <input type="number" min={0} max={50} value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <input type="password" value="••••••••" disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-500" />
                <button type="button" onClick={() => setShowPasswordModal(true)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-600 font-bold hover:underline">Change</button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="1. Education — Last Qualification"
          icon={GraduationCap}
          hint="a) Uni/Board  b) Name  c) Three key subjects  d) Grade/GPA  e) Year of passing"
          action={<button type="button" onClick={addEducation} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}
        >
          {education.length === 0 && <p className="text-xs text-slate-500">Add your highest / last qualification.</p>}
          {education.map((edu, idx) => (
            <EducationForm
              key={idx}
              edu={edu}
              onChange={(updated) => {
                const copy = [...education];
                copy[idx] = updated;
                setEducation(copy);
              }}
              onRemove={() => setEducation(education.filter((_, i) => i !== idx))}
            />
          ))}
        </SectionCard>

        <SectionCard
          title="2. Work Experience"
          icon={Briefcase}
          hint="a) Profession  b) Organization  c) Responsibilities  d) From – To"
          action={<button type="button" onClick={addExperience} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}
        >
          {workExperience.length === 0 && <p className="text-xs text-slate-500">Add teaching or related work experience.</p>}
          {workExperience.map((exp, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">a) Profession</label>
                  <input value={exp.title} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, title: e.target.value }; setWorkExperience(c); }} placeholder="e.g. Home Tutor / Lecturer" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">b) Organization</label>
                  <input value={exp.organization} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, organization: e.target.value }; setWorkExperience(c); }} placeholder="School / Academy / Self-employed" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">c) Responsibilities</label>
                <textarea value={exp.description || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, description: e.target.value }; setWorkExperience(c); }} placeholder="Key responsibilities and achievements..." rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">d) Experience from – to</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <select value={exp.start_month || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, start_month: Number(e.target.value) || null }; setWorkExperience(c); }} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs">
                    <option value="">From month</option>
                    {MONTHS.map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}
                  </select>
                  <input type="number" value={exp.start_year || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, start_year: Number(e.target.value) || null }; setWorkExperience(c); }} placeholder="From year" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                  <select value={exp.end_month || ""} disabled={exp.is_current} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, end_month: Number(e.target.value) || null }; setWorkExperience(c); }} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs disabled:opacity-50">
                    <option value="">To month</option>
                    {MONTHS.map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}
                  </select>
                  <input type="number" value={exp.end_year || ""} disabled={exp.is_current} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, end_year: Number(e.target.value) || null, is_current: false }; setWorkExperience(c); }} placeholder="To year" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs disabled:opacity-50" />
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-600 mt-2">
                  <input type="checkbox" checked={exp.is_current || false} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, is_current: e.target.checked, end_year: e.target.checked ? null : exp.end_year, end_month: e.target.checked ? null : exp.end_month }; setWorkExperience(c); }} />
                  Currently working here
                </label>
              </div>
              <button type="button" onClick={() => setWorkExperience(workExperience.filter((_, i) => i !== idx))} className="text-xs text-red-600 font-bold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
            </div>
          ))}
        </SectionCard>

        <SectionCard
          title="3. Desired Teaching Level"
          icon={GraduationCap}
          hint="a) System  b) Class / grade level  c) Subjects of choice"
        >
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">a) Cambridge / IGCSE / AKUB / Matric</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TEACHING_SYSTEMS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTeachingSystems(toggleInList(teachingSystems, s.id))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      teachingSystems.includes(s.id)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">b) Class / Grade level</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TEACHING_CLASS_LEVELS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTeachingClassLevels(toggleInList(teachingClassLevels, s.id))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      teachingClassLevels.includes(s.id)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">c) Subjects of choice</label>
              <SubjectPicker
                gradeLevelId={gradeLevelId}
                subjectIds={subjectIds}
                onGradeLevelChange={setGradeLevelId}
                onSubjectIdsChange={setSubjectIds}
                teachingGradeIds={teachingGradeIds}
                onTeachingGradeIdsChange={setTeachingGradeIds}
                accumulateAcrossGrades
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Board Qualifications (optional detail)"
          icon={GraduationCap}
          hint="Extra board/subject detail for Matric / Inter / O / A Level matching"
          action={<button type="button" onClick={addBoardQual} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Board</button>}
        >
          {boardQualifications.map((bq, idx) => (
            <BoardQualForm
              key={idx}
              bq={bq}
              onChange={(updated) => {
                const c = [...boardQualifications];
                c[idx] = updated;
                setBoardQualifications(c);
              }}
              onRemove={() => setBoardQualifications(boardQualifications.filter((_, i) => i !== idx))}
            />
          ))}
        </SectionCard>

        <SectionCard title="4. Availability Mode" icon={CreditCard} hint="How you prefer to teach">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AVAILABILITY_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`p-4 rounded-2xl border text-left transition ${
                  mode === m.id
                    ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200"
                    : "border-slate-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-xs font-extrabold text-slate-900">{m.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {m.id === "HOME" && "Visit students at home / venue"}
                  {m.id === "ONLINE" && "Teach via video call"}
                  {m.id === "BOTH" && "Flexible — visiting and online"}
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Degree Certificate" icon={Award}>
          <p className="text-xs text-slate-600">Upload your degree / last qualification certificate (PDF or image).</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input ref={degreeInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleDegreeUpload} className="hidden" id="degree-upload" />
            <label
              htmlFor="degree-upload"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs cursor-pointer transition ${
                degreeUploading ? "bg-slate-100 text-slate-400" : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {degreeUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {degreeUploading ? "Uploading..." : "Upload Degree Certificate"}
            </label>
            {degreeFilename && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {degreeFilename}
              </span>
            )}
          </div>
          {degreeError && <p className="text-xs font-bold text-red-600">{degreeError}</p>}
        </SectionCard>

        <SectionCard title="Other Certificates & Training" icon={Award} action={<button type="button" onClick={addCertificate} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}>
          {certificates.filter((c) => c.kind !== "DEGREE").length === 0 && (
            <p className="text-xs text-slate-500">Optional training certificates.</p>
          )}
          {certificates.map((cert, idx) =>
            cert.kind === "DEGREE" ? null : (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border border-slate-100 rounded-xl p-3">
                <input value={cert.name} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, name: e.target.value }; setCertificates(c); }} placeholder="Certificate name" className="sm:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <input value={cert.issuer || ""} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, issuer: e.target.value }; setCertificates(c); }} placeholder="Issuer" className="sm:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <input type="number" value={cert.year || ""} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, year: Number(e.target.value) || undefined }; setCertificates(c); }} placeholder="Year" className="sm:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <button type="button" onClick={() => setCertificates(certificates.filter((_, i) => i !== idx))} className="sm:col-span-1 p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4 mx-auto" /></button>
              </div>
            )
          )}
        </SectionCard>

        <SectionCard title="Skills" icon={Sparkles}>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-200">
                {s}
                <button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSkillInput} onChange={(e) => setNewSkillInput(e.target.value)} placeholder="Add skill..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
            <button type="button" onClick={() => { if (newSkillInput.trim()) { setSkills([...skills, newSkillInput.trim()]); setNewSkillInput(""); } }} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl">Add</button>
          </div>
        </SectionCard>

        <SectionCard title="Payout Details" icon={CreditCard}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Bank Name</label>
              <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Account Title</label>
              <input type="text" value={accountTitle} onChange={(e) => setAccountTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-600">IBAN / Account Number</label>
              <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono" />
            </div>
          </div>
        </SectionCard>

        <button type="submit" className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg">
          {isOnboarding ? "Save Profile & Go to Dashboard" : "Save Profile"}
        </button>
      </form>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Change Password</h3>
            {passwordError && <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl p-2">{passwordError}</p>}
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
              <input type="password" placeholder="New password (min 8 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
              <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(""); }} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EducationForm({
  edu,
  onChange,
  onRemove,
}: {
  edu: EducationEntry;
  onChange: (e: EducationEntry) => void;
  onRemove: () => void;
}) {
  const subjects = [...(edu.subjects || [])];
  while (subjects.length < 3) subjects.push("");

  const setSubjectAt = (i: number, value: string) => {
    const next = [...subjects];
    next[i] = value;
    onChange({ ...edu, subjects: next.filter((s, idx) => s.trim() || idx < 3).slice(0, 3).map((s) => s.trim() ? s : "") });
  };

  return (
    <div className="border border-slate-100 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">a) Uni / Board</label>
          <select
            value={edu.board || "UNIVERSITY"}
            onChange={(e) => onChange({ ...edu, board: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          >
            {QUALIFICATION_TYPES.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">b) Name of Uni / Board</label>
          <input
            value={edu.institution}
            onChange={(e) => onChange({ ...edu, institution: e.target.value })}
            placeholder="e.g. University of Karachi / BISE Karachi"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase">c) Key subjects (any three)</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              value={subjects[i] || ""}
              onChange={(e) => setSubjectAt(i, e.target.value)}
              placeholder={`Subject ${i + 1}`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">d) Grade / Division / GPA</label>
          <input
            value={edu.grade_or_result || ""}
            onChange={(e) => onChange({ ...edu, grade_or_result: e.target.value })}
            placeholder="e.g. 1st Division / 3.5 GPA / A*"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">e) Year of passing</label>
          <input
            type="number"
            value={edu.year_completed || ""}
            onChange={(e) => onChange({ ...edu, year_completed: Number(e.target.value) || null })}
            placeholder="e.g. 2020"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          />
        </div>
      </div>
      <button type="button" onClick={onRemove} className="text-xs text-red-600 font-bold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
    </div>
  );
}

function BoardQualForm({
  bq,
  onChange,
  onRemove,
}: {
  bq: BoardQualificationEntry;
  onChange: (b: BoardQualificationEntry) => void;
  onRemove: () => void;
}) {
  const boardId = (bq.board || "O_LEVEL") as BoardId;
  const groups = getGroupsForBoard(boardId);
  const availableSubjects = getSubjectsForBoard(boardId, bq.group || undefined);

  const toggleSubject = (sub: string) => {
    const current = bq.subjects || [];
    onChange({
      ...bq,
      subjects: current.includes(sub) ? current.filter((s) => s !== sub) : [...current, sub],
    });
  };

  return (
    <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Board</label>
          <select value={boardId} onChange={(e) => onChange({ ...bq, board: e.target.value, group: null, subjects: [] })} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs">
            {BOARD_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Group</label>
          <select value={bq.group || ""} onChange={(e) => onChange({ ...bq, group: e.target.value || null, subjects: [] })} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs">
            <option value="">All groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-[10px] text-slate-500">{PAKISTANI_BOARDS[boardId]?.description}</p>
      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
        {availableSubjects.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => toggleSubject(sub)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
              (bq.subjects || []).includes(sub)
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>
      <button type="button" onClick={onRemove} className="text-xs text-red-600 font-bold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
    </div>
  );
}
