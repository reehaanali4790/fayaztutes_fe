export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

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
  hourly_rate_min: number;
  hourly_rate_max: number;
  monthly_rate_expected: number;
  rating_avg: number;
  rating_count: number;
  cnic_verified: boolean;
  bank_name?: string;
  bank_account_number?: string;
  account_title?: string;
}

export interface TuitionLead {
  id: string;
  parent_id: string;
  tuition_code: string;
  title: string;
  grade_level: string;
  subjects: string[];
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
  created_at: string;
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

export async function fetchJson<T>(path: string, token?: string | null): Promise<T> {
  const res = await apiFetch(path, {}, token);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
