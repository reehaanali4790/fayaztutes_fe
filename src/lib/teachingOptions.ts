/** Desired teaching systems tutors can opt into */
export const TEACHING_SYSTEMS = [
  { id: "CAMBRIDGE", label: "Cambridge" },
  { id: "IGCSE", label: "IGCSE" },
  { id: "AKUB", label: "AKU-EB / AKUB" },
  { id: "MATRIC", label: "Matric system" },
] as const;

/** Class / grade bands for teaching preference */
export const TEACHING_CLASS_LEVELS = [
  { id: "PRE_PRIMARY", label: "Pre-Primary" },
  { id: "PRIMARY", label: "Primary" },
  { id: "SECONDARY", label: "Secondary" },
  { id: "INTERMEDIATE", label: "Intermediate" },
  { id: "DIPLOMA", label: "Diploma" },
  { id: "BACHELOR", label: "Bachelor" },
  { id: "MASTERS", label: "Masters" },
] as const;

/** Last qualification — Uni / Board type */
export const QUALIFICATION_TYPES = [
  { id: "UNIVERSITY", label: "University" },
  { id: "MATRIC", label: "Matric / Board" },
  { id: "INTER", label: "Intermediate / Board" },
  { id: "O_LEVEL", label: "Cambridge O Level" },
  { id: "IGCSE", label: "IGCSE" },
  { id: "A_LEVEL", label: "Cambridge A Level" },
  { id: "AKUB", label: "AKU-EB / AKUB" },
  { id: "OTHER", label: "Other" },
] as const;

export const AVAILABILITY_MODES = [
  { id: "HOME", label: "Visiting Clients" },
  { id: "ONLINE", label: "Online" },
  { id: "BOTH", label: "Both Visiting & Online" },
] as const;

export const WHATSAPP_NUMBER = "923029331779";
export const WHATSAPP_DISPLAY = "+92 302 9331779";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
