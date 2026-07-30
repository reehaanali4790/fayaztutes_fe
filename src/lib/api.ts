function resolveApiBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1").trim().replace(/\/+$/, "");
  // Backend routes live under /api/v1 — accept either form of NEXT_PUBLIC_API_URL
  if (raw.endsWith("/api/v1")) return raw;
  return `${raw}/api/v1`;
}

export const API_BASE_URL = resolveApiBaseUrl();

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}

export interface CertificateEntry {
  name: string;
  issuer?: string;
  year?: number;
}

export interface EducationEntry {
  board: string;
  institution: string;
  group?: string | null;
  year_completed?: number | null;
  grade_or_result?: string | null;
  subjects: string[];
}

export interface WorkExperienceEntry {
  title: string;
  organization: string;
  start_year?: number | null;
  end_year?: number | null;
  is_current?: boolean;
  description?: string;
}

export interface BoardQualificationEntry {
  board: string;
  group?: string | null;
  subjects: string[];
}

export interface TutorProfile {
  id: string;
  user_id: string;
  full_name?: string;
  headline?: string;
  bio?: string;
  city: string;
  area?: string;
  gender: string;
  experience_years: number;
  education_level: string;
  preferred_mode: string;
  subjects: string[];
  subject_ids?: string[];
  teaching_grade_ids?: string[];
  hourly_rate_min: number;
  hourly_rate_max: number;
  monthly_rate_expected: number;
  rating_avg: number;
  rating_count: number;
  cnic_verified: boolean;
  bank_name?: string;
  bank_account_number?: string;
  account_title?: string;
  skills?: string[];
  certificates?: CertificateEntry[];
  education?: EducationEntry[];
  work_experience?: WorkExperienceEntry[];
  board_qualifications?: BoardQualificationEntry[];
  resume_filename?: string;
}

export interface ResumeParseResult {
  headline?: string;
  bio?: string;
  experience_years: number;
  city?: string;
  skills: string[];
  certificates: CertificateEntry[];
  education: EducationEntry[];
  work_experience: WorkExperienceEntry[];
  subjects_can_teach: string[];
  subject_ids?: string[];
  board_qualifications: BoardQualificationEntry[];
  resume_filename?: string;
}

export interface TuitionLead {
  id: string;
  parent_id: string;
  tuition_code: string;
  title: string;
  grade_level: string;
  grade_level_id?: string;
  subjects: string[];
  subject_ids?: string[];
  curriculum: string;
  teaching_mode: string;
  city: string;
  area: string;
  address_snippet?: string;
  preferred_tutor_gender: string;
  offered_fee: number;
  is_negotiable: boolean;
  description?: string;
  status: string;
  created_at: string;
  applications_count?: number;
}

export interface Application {
  id: string;
  tuition_id: string;
  tutor_id: string;
  status: string;
  pitch_notes?: string;
  created_at: string;
  tuition?: TuitionLead;
  tutor?: { id: string; full_name: string; email: string; phone_number?: string };
  tutor_profile?: TutorProfile;
}

export interface DemoSession {
  id: string;
  application_id: string;
  scheduled_at: string;
  demo_number: number;
  meeting_link?: string;
  status: string;
  parent_feedback?: string;
  rating?: number;
  created_at?: string;
  tutor_name?: string;
  parent_name?: string;
  tuition_title?: string;
  tuition_code?: string;
}

export interface EscrowPayment {
  id: string;
  tuition_id: string;
  application_id: string;
  total_amount: number;
  commission_amount: number;
  tutor_payout_amount: number;
  status: string;
  payment_method: string;
  transaction_ref?: string;
  created_at: string;
}

export interface PublicStats {
  tutor_count: number;
  family_count: number;
  open_leads_count: number;
  avg_rating: number;
}

export interface MatchRecommendation {
  tutor_id: string;
  user_id: string;
  headline?: string;
  rating_avg: number;
  rating_count: number;
  city: string;
  area?: string;
  gender: string;
  experience_years: number;
  education_level: string;
  match_score: number;
  match_reasons: string[];
}

export interface KYCQueueItem {
  profile_id: string;
  tutor_name: string;
  email: string;
  city: string;
  cnic_verified: boolean;
  education_level: string;
  subjects: string[];
}

export interface CatalogSubject {
  id: string;
  name: string;
  group_id?: string | null;
}

export interface CatalogGroup {
  id: string | null;
  label: string;
  subjects: CatalogSubject[];
}

export interface CatalogGrade {
  id: string;
  label: string;
  groups: CatalogGroup[];
}

export interface CatalogCurriculum {
  id: string;
  label: string;
  description?: string | null;
  grades: CatalogGrade[];
}

export async function fetchJson<T>(path: string, token?: string | null): Promise<T> {
  const res = await apiFetch(path, {}, token);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function uploadResumeForParsing(
  file: File,
  token: string | null
): Promise<ResumeParseResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE_URL}/tutors/me/resume/parse`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Upload failed (${res.status})`);
  }
  return res.json();
}
