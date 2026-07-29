"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  apiFetch,
  uploadResumeForParsing,
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

function SectionCard({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Icon className="w-4 h-4 text-indigo-600" />
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
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

  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("Karachi");
  const [experienceYears, setExperienceYears] = useState(0);
  const [gradeLevelId, setGradeLevelId] = useState("o_level");
  const [subjectIds, setSubjectIds] = useState<string[]>([]);
  const [teachingGradeIds, setTeachingGradeIds] = useState<string[]>([]);
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

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parseSuccess, setParseSuccess] = useState(false);

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
    setExperienceYears(profile.experience_years ?? 0);
    setSubjectIds(profile.subject_ids || []);
    setTeachingGradeIds(profile.teaching_grade_ids || []);
    if (profile.teaching_grade_ids?.[0]) setGradeLevelId(profile.teaching_grade_ids[0]);
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
            experience_years: experienceYears,
            subject_ids: subjectIds,
            teaching_grade_ids: teachingGradeIds.length ? teachingGradeIds : [gradeLevelId],
            skills,
            certificates,
            education,
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
        throw new Error(err.detail || "Failed to save profile");
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
    setEducation([...education, { board: "MATRIC", institution: "", subjects: [], group: null, year_completed: null, grade_or_result: null }]);

  const addCertificate = () => setCertificates([...certificates, { name: "", issuer: "", year: undefined }]);

  const addExperience = () =>
    setWorkExperience([...workExperience, { title: "", organization: "", description: "", is_current: false }]);

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
            ? "Welcome! Add your subjects, experience, and bio so parents can find and trust you. Experience years are based on your work history — never a default."
            : "Upload your resume to auto-fill, or complete each section manually. Experience years come from your work history — not a default."}
        </p>
      </div>

      {isOnboarding && (
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-indigo-900 text-sm">
          <strong>Step 1 of onboarding:</strong> Complete your profile below, then you can browse tuition leads and apply.
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
        {/* Resume Upload */}
        <SectionCard title="Resume / CV Upload" icon={FileText}>
          <p className="text-xs text-slate-600">
            Upload PDF or DOCX — Mistral AI will extract skills, education, certificates, and experience. You can edit everything after parsing.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleResumeUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs cursor-pointer transition ${
                parsing ? "bg-slate-100 text-slate-400" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              }`}
            >
              {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {parsing ? "Parsing with Mistral AI..." : "Upload & Parse Resume"}
            </label>
            {resumeFilename && (
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> {resumeFilename}
              </span>
            )}
          </div>
          {parseError && <p className="text-xs font-bold text-red-600">{parseError}</p>}
        </SectionCard>

        {/* Account header */}
        <SectionCard title="Account" icon={ShieldCheck}>
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

        {/* Skills */}
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

        {/* Education */}
        <SectionCard title="Education" icon={GraduationCap} action={<button type="button" onClick={addEducation} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}>
          {education.length === 0 && <p className="text-xs text-slate-500">No education added. Upload a resume or add manually.</p>}
          {education.map((edu, idx) => (
            <EducationForm key={idx} edu={edu} onChange={(updated) => { const copy = [...education]; copy[idx] = updated; setEducation(copy); }} onRemove={() => setEducation(education.filter((_, i) => i !== idx))} />
          ))}
        </SectionCard>

        {/* Certificates */}
        <SectionCard title="Certificates & Training" icon={Award} action={<button type="button" onClick={addCertificate} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}>
          {certificates.length === 0 && <p className="text-xs text-slate-500">No certificates added yet.</p>}
          {certificates.map((cert, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border border-slate-100 rounded-xl p-3">
              <input value={cert.name} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, name: e.target.value }; setCertificates(c); }} placeholder="Certificate name" className="sm:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
              <input value={cert.issuer || ""} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, issuer: e.target.value }; setCertificates(c); }} placeholder="Issuer" className="sm:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
              <input type="number" value={cert.year || ""} onChange={(e) => { const c = [...certificates]; c[idx] = { ...cert, year: Number(e.target.value) || undefined }; setCertificates(c); }} placeholder="Year" className="sm:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
              <button type="button" onClick={() => setCertificates(certificates.filter((_, i) => i !== idx))} className="sm:col-span-1 p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4 mx-auto" /></button>
            </div>
          ))}
        </SectionCard>

        {/* Work Experience */}
        <SectionCard title="Work Experience" icon={Briefcase} action={<button type="button" onClick={addExperience} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>}>
          {workExperience.length === 0 && <p className="text-xs text-slate-500">No work experience added yet.</p>}
          {workExperience.map((exp, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={exp.title} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, title: e.target.value }; setWorkExperience(c); }} placeholder="Job title (e.g. Home Tutor)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <input value={exp.organization} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, organization: e.target.value }; setWorkExperience(c); }} placeholder="Organization / Self-employed" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <input type="number" value={exp.start_year || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, start_year: Number(e.target.value) || null }; setWorkExperience(c); }} placeholder="Start year" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
                <input type="number" value={exp.end_year || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, end_year: Number(e.target.value) || null, is_current: false }; setWorkExperience(c); }} placeholder="End year (leave blank if current)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" disabled={exp.is_current} />
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" checked={exp.is_current || false} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, is_current: e.target.checked, end_year: e.target.checked ? null : exp.end_year }; setWorkExperience(c); }} />
                Currently working here
              </label>
              <textarea value={exp.description || ""} onChange={(e) => { const c = [...workExperience]; c[idx] = { ...exp, description: e.target.value }; setWorkExperience(c); }} placeholder="Describe your role and achievements..." rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none" />
              <button type="button" onClick={() => setWorkExperience(workExperience.filter((_, i) => i !== idx))} className="text-xs text-red-600 font-bold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
            </div>
          ))}
        </SectionCard>

        {/* Board Qualifications */}
        <SectionCard title="Board Qualifications (What You Can Teach)" icon={GraduationCap} action={<button type="button" onClick={addBoardQual} className="text-xs font-bold text-indigo-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Board</button>}>
          <p className="text-xs text-slate-500">Select your Pakistani board and subjects — Matric, Inter, O Level, or A Level. This prevents confusion when matching with parents.</p>
          {boardQualifications.map((bq, idx) => (
            <BoardQualForm key={idx} bq={bq} onChange={(updated) => { const c = [...boardQualifications]; c[idx] = updated; setBoardQualifications(c); }} onRemove={() => setBoardQualifications(boardQualifications.filter((_, i) => i !== idx))} />
          ))}
        </SectionCard>

        {/* Teaching Subjects */}
        <SectionCard title="Subjects You Can Teach" icon={GraduationCap}>
          <p className="text-xs text-slate-500 mb-3">Pick subjects from the official catalog — same lists parents use when posting tuition.</p>
          <SubjectPicker
            gradeLevelId={gradeLevelId}
            subjectIds={subjectIds}
            onGradeLevelChange={setGradeLevelId}
            onSubjectIdsChange={setSubjectIds}
            teachingGradeIds={teachingGradeIds}
            onTeachingGradeIdsChange={setTeachingGradeIds}
            accumulateAcrossGrades
          />
        </SectionCard>

        {/* Bank */}
        <SectionCard title="Teaching Mode & Payout" icon={CreditCard}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Teaching Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <option value="BOTH">Both Home & Online</option>
                <option value="HOME">Home Only</option>
                <option value="ONLINE">Online Only</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Bank Name</label>
              <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Account Title</label>
              <input type="text" value={accountTitle} onChange={(e) => setAccountTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
            </div>
            <div className="space-y-1">
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
  const boardId = (edu.board || "MATRIC") as BoardId;
  const groups = getGroupsForBoard(boardId);
  const availableSubjects = getSubjectsForBoard(boardId, edu.group || undefined);

  const toggleSubject = (sub: string) => {
    const current = edu.subjects || [];
    onChange({
      ...edu,
      subjects: current.includes(sub) ? current.filter((s) => s !== sub) : [...current, sub],
    });
  };

  return (
    <div className="border border-slate-100 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Board</label>
          <select
            value={boardId}
            onChange={(e) => onChange({ ...edu, board: e.target.value, group: null, subjects: [] })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          >
            {BOARD_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Group / Stream</label>
          <select
            value={edu.group || ""}
            onChange={(e) => onChange({ ...edu, group: e.target.value || null, subjects: [] })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
          >
            <option value="">All groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <input value={edu.institution} onChange={(e) => onChange({ ...edu, institution: e.target.value })} placeholder="School / College / University" className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
        <input type="number" value={edu.year_completed || ""} onChange={(e) => onChange({ ...edu, year_completed: Number(e.target.value) || null })} placeholder="Year completed" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
        <input value={edu.grade_or_result || ""} onChange={(e) => onChange({ ...edu, grade_or_result: e.target.value })} placeholder="Grade / Result (e.g. A*, 85%)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
      </div>
      {availableSubjects.length > 0 && (
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Subjects (select from board list)</label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => toggleSubject(sub)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                  (edu.subjects || []).includes(sub)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
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
