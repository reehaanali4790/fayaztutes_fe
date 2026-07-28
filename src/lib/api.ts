const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface TutorProfile {
  id: string;
  user_id: string;
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
  status: "APPLIED" | "SCREENED" | "SHORTLISTED" | "DEMO_SCHEDULED" | "REJECTED" | "HIRED";
  pitch_notes?: string;
  created_at: string;
  tuition?: TuitionLead;
}

export interface DemoSession {
  id: string;
  application_id: string;
  scheduled_at: string;
  demo_number: number;
  meeting_link?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "PASSED" | "FAILED";
  parent_feedback?: string;
  rating?: number;
  created_at: string;
}

// Fallback Mock Data for FayazTutes Platform
export const MOCK_TUITIONS: TuitionLead[] = [
  {
    id: "lead-1",
    parent_id: "p1",
    tuition_code: "FT-20263888",
    title: "Grade: Grades 3, 4, and 6. Subject: All Cambridge Primary",
    grade_level: "Grades 3, 4 & 6",
    subjects: ["English", "Math", "Science", "Social Studies"],
    curriculum: "Cambridge Primary",
    teaching_mode: "HOME",
    city: "Karachi",
    area: "DHA Phase 8 Creek Vista",
    address_snippet: "DHA Phase 8 Creek Vista, Karachi, Pakistan",
    preferred_tutor_gender: "FEMALE",
    offered_fee: 35000,
    is_negotiable: true,
    description: "Professional Cambridge experienced female tutor required for 3 siblings. Excellent English communication required.",
    status: "OPEN",
    created_at: "7/28/2026, 7:57 AM",
    applications_count: 3
  },
  {
    id: "lead-2",
    parent_id: "p1",
    tuition_code: "FT-20263889",
    title: "Grade: O Level MJ-2027 Subject: Math & Physics",
    grade_level: "O Level",
    subjects: ["Mathematics (4024)", "Physics (5054)"],
    curriculum: "Cambridge O Level",
    teaching_mode: "HOME",
    city: "Karachi",
    area: "Scheme 33 Saadi Town",
    address_snippet: "Central Information Housing Society, Sector 36 A Gulzar E Hijri, Karachi",
    preferred_tutor_gender: "ANY",
    offered_fee: 30000,
    is_negotiable: true,
    description: "Experienced O Level background tutor required for May/June 2027 candidate student.",
    status: "OPEN",
    created_at: "7/27/2026, 7:35 PM",
    applications_count: 5
  },
  {
    id: "lead-3",
    parent_id: "p2",
    tuition_code: "FT-20263890",
    title: "Grade: A Level Student Subject: Computer Science & Maths",
    grade_level: "A Level",
    subjects: ["Computer Science (9618)", "Mathematics (9709)"],
    curriculum: "Cambridge A Level",
    teaching_mode: "ONLINE",
    city: "Karachi",
    area: "DHA Phase 5",
    address_snippet: "DHA Phase 5, Karachi",
    preferred_tutor_gender: "ANY",
    offered_fee: 40000,
    is_negotiable: false,
    description: "High-intensity A Level online tutoring sessions via Zoom.",
    status: "OPEN",
    created_at: "7/27/2026, 6:22 PM",
    applications_count: 2
  },
  {
    id: "lead-4",
    parent_id: "p2",
    tuition_code: "FT-20263983",
    title: "Grade: 10 Arts Subject: All General Subjects",
    grade_level: "Grade 10 Arts",
    subjects: ["General Science", "General Math", "Urdu", "Islamiat"],
    curriculum: "Matriculation",
    teaching_mode: "HOME",
    city: "Karachi",
    area: "Lalazar Check Post",
    address_snippet: "Lalazar Check Post Location, Karachi",
    preferred_tutor_gender: "ANY",
    offered_fee: 32000,
    is_negotiable: true,
    description: "Home tuition required for matric arts student.",
    status: "OPEN",
    created_at: "2 weeks ago",
    applications_count: 4
  },
  {
    id: "lead-5",
    parent_id: "p3",
    tuition_code: "FT-20264170",
    title: "Grade: Grade 7 Subject: Basics English Urdu maths reading writing speaking",
    grade_level: "Grade 7",
    subjects: ["English", "Urdu", "Math", "Reading & Writing"],
    curriculum: "Federal Board",
    teaching_mode: "HOME",
    city: "Karachi",
    area: "Clifton 3 Talwar",
    address_snippet: "Clifton 3 Talwar, Karachi",
    preferred_tutor_gender: "ANY",
    offered_fee: 28000,
    is_negotiable: true,
    description: "Basics English Urdu maths reading writing speaking for Grade 7",
    status: "OPEN",
    created_at: "Jun 15, 2026",
    applications_count: 2
  }
];

export const MOCK_MY_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    tuition_id: "lead-4",
    tutor_id: "tutor-1",
    status: "SCREENED",
    pitch_notes: "Applied 2 weeks ago. Qualified in Arts and general subjects.",
    created_at: "2026-07-14",
    tuition: MOCK_TUITIONS[3]
  },
  {
    id: "app-2",
    tuition_id: "lead-5",
    tutor_id: "tutor-1",
    status: "SCREENED",
    pitch_notes: "Negotiable before demo class.",
    created_at: "2026-06-15",
    tuition: MOCK_TUITIONS[4]
  },
  {
    id: "app-3",
    tuition_id: "lead-2",
    tutor_id: "tutor-1",
    status: "SHORTLISTED",
    pitch_notes: "10+ years O Level Math & Physics teaching experience.",
    created_at: "2026-07-27",
    tuition: MOCK_TUITIONS[1]
  },
  {
    id: "app-4",
    tuition_id: "lead-3",
    tutor_id: "tutor-1",
    status: "DEMO_SCHEDULED",
    pitch_notes: "Specialized in A Level CS 9618 paper 4 Python.",
    created_at: "2026-07-27",
    tuition: MOCK_TUITIONS[2]
  }
];

export const MOCK_PROFILE: TutorProfile = {
  id: "profile-1",
  user_id: "tutor-1",
  headline: "Experienced Cambridge O/A Level Math & CS Specialist",
  bio: "Passionate educator with 8+ years experience in Cambridge O/A Levels, MDCAT Math, and Computer Science.",
  city: "Karachi",
  area: "DHA Phase 5",
  gender: "MALE",
  experience_years: 8,
  education_level: "B.S. Computer Science",
  preferred_mode: "BOTH",
  subjects: [
    "English Language", "Science", "General Science", "Social Studies", 
    "History", "Pakistan Studies", "Islamiat", "Reading Comprehension", 
    "General Knowledge", "Math", "All", "English", "Urdu", "Nursery", "Kindergarten"
  ],
  hourly_rate_min: 1500,
  hourly_rate_max: 3500,
  monthly_rate_expected: 35000,
  rating_avg: 4.9,
  rating_count: 24,
  cnic_verified: true,
  bank_name: "Meezan Bank",
  bank_account_number: "PK36MEZN00010982347101",
  account_title: "Fayaz Ali"
};
