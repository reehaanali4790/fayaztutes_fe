import type { TutorProfile } from "@/lib/api";

export const TUTOR_ONBOARDING_KEY = "ft_tutor_onboarding";

export function isTutorProfileIncomplete(profile: TutorProfile | null): boolean {
  if (!profile) return true;
  const hasSubjects = (profile.subject_ids?.length ?? 0) > 0;
  const hasIntro = Boolean(profile.headline?.trim() || profile.bio?.trim());
  return !hasSubjects || !hasIntro;
}

export function markTutorOnboardingPending() {
  if (typeof window !== "undefined") {
    localStorage.setItem(TUTOR_ONBOARDING_KEY, "1");
  }
}

export function clearTutorOnboardingPending() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TUTOR_ONBOARDING_KEY);
  }
}

export function isTutorOnboardingPending(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(TUTOR_ONBOARDING_KEY) === "1";
}
