export type BoardId = "MATRIC" | "INTER" | "O_LEVEL" | "A_LEVEL" | "UNIVERSITY" | "OTHER";

export interface BoardConfig {
  id: BoardId;
  label: string;
  description: string;
  groups: Record<string, string[]>;
}

export const PAKISTANI_BOARDS: Record<BoardId, BoardConfig> = {
  MATRIC: {
    id: "MATRIC",
    label: "Matric / SSC (Grade 9–10)",
    description: "Secondary School Certificate — BISE boards",
    groups: {
      Compulsory: ["English", "Urdu", "Islamiyat", "Pakistan Studies", "Mathematics"],
      "Science Group": ["Physics", "Chemistry", "Biology", "Computer Science"],
      "Humanities Group": [
        "General Mathematics", "General Science", "Civics", "Economics", "Education",
        "Geography", "Islamic Studies", "English Literature", "Urdu Literature",
        "Arabic", "Art & Model Drawing", "Business Studies",
      ],
    },
  },
  INTER: {
    id: "INTER",
    label: "Intermediate / HSSC (Grade 11–12)",
    description: "Higher Secondary — FSc, FA, ICS, ICom",
    groups: {
      Compulsory: ["English", "Urdu", "Islamiyat / Ethics", "Pakistan Studies"],
      "Pre-Medical": ["Physics", "Chemistry", "Biology"],
      "Pre-Engineering": ["Physics", "Chemistry", "Mathematics"],
      "Computer Science": ["Physics", "Mathematics", "Computer Science"],
      Commerce: ["Principles of Accounting", "Business Mathematics", "Economics", "Commercial Geography"],
      "Arts / Humanities": ["Civics", "Education", "Economics", "Geography", "History", "Psychology", "Sociology"],
    },
  },
  O_LEVEL: {
    id: "O_LEVEL",
    label: "Cambridge O Level / IGCSE",
    description: "CAIE — equivalent to Matric",
    groups: {
      "Compulsory (IBCC)": ["English Language", "Mathematics", "Urdu", "Islamiyat", "Pakistan Studies"],
      Sciences: ["Physics", "Chemistry", "Biology", "Additional Mathematics", "Computer Science"],
      "Commerce & Humanities": ["Accounting", "Business Studies", "Economics", "History", "Geography", "Law"],
      Languages: ["English Literature", "French", "German", "Arabic", "Art & Design"],
    },
  },
  A_LEVEL: {
    id: "A_LEVEL",
    label: "Cambridge A Level / AS Level",
    description: "CAIE — equivalent to Intermediate",
    groups: {
      Sciences: ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
      Commerce: ["Accounting", "Business", "Economics"],
      Humanities: ["Psychology", "Sociology", "History", "Geography", "Law"],
      Languages: ["English Language", "English Literature", "Urdu", "French", "Arabic"],
    },
  },
  UNIVERSITY: {
    id: "UNIVERSITY",
    label: "University / Degree",
    description: "Bachelor's, Master's, professional degrees",
    groups: {
      "Common Fields": [
        "Computer Science", "Software Engineering", "Electrical Engineering",
        "Business Administration", "Commerce", "Economics", "Mathematics",
        "Physics", "Chemistry", "Biology", "MBBS", "LLB", "Education",
      ],
    },
  },
  OTHER: {
    id: "OTHER",
    label: "Other Qualification",
    description: "Professional or international qualifications",
    groups: { General: [] },
  },
};

export const BOARD_OPTIONS = Object.values(PAKISTANI_BOARDS).map((b) => ({
  id: b.id,
  label: b.label,
}));

export function getSubjectsForBoard(boardId: BoardId, group?: string): string[] {
  const board = PAKISTANI_BOARDS[boardId];
  if (!board) return [];
  if (group && board.groups[group]) return board.groups[group];
  const all = new Set<string>();
  Object.values(board.groups).forEach((subs) => subs.forEach((s) => all.add(s)));
  return Array.from(all).sort();
}

export function getGroupsForBoard(boardId: BoardId): string[] {
  return Object.keys(PAKISTANI_BOARDS[boardId]?.groups || {});
}
