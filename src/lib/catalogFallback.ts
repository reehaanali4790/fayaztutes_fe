import type { CatalogCurriculum } from "@/hooks/useCatalog";

const S: Record<string, string> = {
  english: "English",
  urdu: "Urdu",
  mathematics: "Mathematics",
  islamiat: "Islamiat",
  nazra_quran: "Nazra Quran",
  general_knowledge: "General Knowledge",
  general_science: "General Science",
  social_studies: "Social Studies",
  science: "Science",
  pakistan_studies: "Pakistan Studies",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  computer_science: "Computer Science",
  additional_mathematics: "Additional Mathematics",
  general_mathematics: "General Mathematics",
  civics: "Civics",
  economics: "Economics",
  education: "Education",
  geography: "Geography",
  islamic_studies: "Islamic Studies",
  english_literature: "English Literature",
  urdu_literature: "Urdu Literature",
  arabic: "Arabic",
  art_design: "Art & Design",
  business_studies: "Business Studies",
  accounting: "Accounting",
  principles_of_accounting: "Principles of Accounting",
  business_mathematics: "Business Mathematics",
  commercial_geography: "Commercial Geography",
  psychology: "Psychology",
  sociology: "Sociology",
  history: "History",
  law: "Law",
  further_mathematics: "Further Mathematics",
  information_technology: "Information Technology",
  english_language: "English Language",
  mdcat_biology: "MDCAT Biology",
  mdcat_chemistry: "MDCAT Chemistry",
  mdcat_physics: "MDCAT Physics",
  mdcat_english: "MDCAT English",
  mdcat_logical_reasoning: "MDCAT Logical Reasoning",
  ecat_mathematics: "ECAT Mathematics",
  ecat_physics: "ECAT Physics",
  ecat_chemistry: "ECAT Chemistry",
  ecat_english: "ECAT English",
  ielts: "IELTS",
  quran_studies: "Quran & Islamic Studies",
  coding: "Coding / Programming",
};

function subs(ids: string[]) {
  return ids.map((id) => ({ id, name: S[id] || id.replace(/_/g, " ") }));
}

function grade(id: string, label: string, subjectIds: string[]) {
  return {
    id,
    label,
    groups: [{ id: null, label: "Subjects", subjects: subs(subjectIds) }],
  };
}

/** Offline fallback — mirrors backend SNC + board catalog when API is unavailable */
export const CATALOG_FALLBACK: CatalogCurriculum[] = [
  {
    id: "SNC",
    label: "Single National Curriculum (SNC)",
    grades: [
      grade("primary_1_3", "Primary Grades 1–3", [
        "english", "urdu", "mathematics", "islamiat", "nazra_quran", "general_knowledge",
      ]),
      grade("primary_4_5", "Primary Grades 4–5", [
        "english", "urdu", "mathematics", "islamiat", "general_science", "social_studies",
      ]),
      grade("middle_6_8", "Middle School Grades 6–8", [
        "english", "urdu", "mathematics", "science", "social_studies", "islamiat", "computer_science", "arabic",
      ]),
    ],
  },
  {
    id: "CAMBRIDGE_PRIMARY",
    label: "Cambridge Primary / Checkpoint",
    grades: [
      grade("cambridge_primary", "Cambridge Primary", [
        "english", "mathematics", "science", "urdu", "islamiat", "computer_science",
      ]),
      grade("cambridge_checkpoint", "Cambridge Checkpoint (Grades 6–8)", [
        "english", "mathematics", "science", "urdu", "islamiat", "computer_science", "history", "geography",
      ]),
    ],
  },
  {
    id: "MATRIC",
    label: "Matric / SSC",
    grades: [
      {
        id: "matric_9_10",
        label: "Matric / SSC (Grades 9–10)",
        groups: [
          { id: "matric_compulsory", label: "Compulsory", subjects: subs(["english", "urdu", "islamiat", "pakistan_studies", "mathematics"]) },
          { id: "matric_science", label: "Science Group", subjects: subs(["physics", "chemistry", "biology", "computer_science"]) },
          { id: "matric_humanities", label: "Humanities Group", subjects: subs(["general_mathematics", "general_science", "civics", "economics", "geography", "business_studies"]) },
        ],
      },
    ],
  },
  {
    id: "INTER",
    label: "Intermediate / HSSC",
    grades: [
      {
        id: "inter_11_12",
        label: "Intermediate / HSSC (Grades 11–12)",
        groups: [
          { id: "inter_pre_medical", label: "Pre-Medical", subjects: subs(["physics", "chemistry", "biology"]) },
          { id: "inter_pre_engineering", label: "Pre-Engineering", subjects: subs(["physics", "chemistry", "mathematics"]) },
          { id: "inter_ics", label: "Computer Science (ICS)", subjects: subs(["physics", "mathematics", "computer_science"]) },
          { id: "inter_commerce", label: "Commerce", subjects: subs(["principles_of_accounting", "business_mathematics", "economics", "commercial_geography"]) },
          { id: "inter_arts", label: "Arts / Humanities", subjects: subs(["civics", "economics", "geography", "history", "psychology", "sociology"]) },
        ],
      },
    ],
  },
  {
    id: "O_LEVEL",
    label: "Cambridge O Level / IGCSE",
    grades: [
      {
        id: "o_level",
        label: "Cambridge O Level / IGCSE",
        groups: [
          { id: "olevel_compulsory", label: "Compulsory", subjects: subs(["english_language", "mathematics", "urdu", "islamiat", "pakistan_studies"]) },
          { id: "olevel_sciences", label: "Sciences", subjects: subs(["physics", "chemistry", "biology", "additional_mathematics", "computer_science"]) },
          { id: "olevel_commerce", label: "Commerce & Humanities", subjects: subs(["accounting", "business_studies", "economics", "history", "geography", "law"]) },
        ],
      },
    ],
  },
  {
    id: "A_LEVEL",
    label: "Cambridge A Level",
    grades: [
      {
        id: "a_level",
        label: "Cambridge A Level",
        groups: [
          { id: "alevel_sciences", label: "Sciences", subjects: subs(["mathematics", "further_mathematics", "physics", "chemistry", "biology", "computer_science"]) },
          { id: "alevel_commerce", label: "Commerce", subjects: subs(["accounting", "business_studies", "economics"]) },
          { id: "alevel_humanities", label: "Humanities", subjects: subs(["psychology", "sociology", "history", "geography", "law", "english_literature", "urdu"]) },
        ],
      },
    ],
  },
  {
    id: "EXAM_PREP",
    label: "Exam Preparation",
    grades: [
      grade("mdcat", "MDCAT Preparation", [
        "mdcat_biology", "mdcat_chemistry", "mdcat_physics", "mdcat_english", "mdcat_logical_reasoning",
      ]),
      grade("ecat", "ECAT Preparation", ["ecat_mathematics", "ecat_physics", "ecat_chemistry", "ecat_english"]),
      grade("ielts_prep", "IELTS Preparation", ["ielts", "english"]),
    ],
  },
];

export const DEFAULT_GRADE_LEVEL_ID = "o_level";
export const DEFAULT_SUBJECT_ID = "mathematics";
