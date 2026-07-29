"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  fetchJson,
  Application,
  TuitionLead,
  TutorProfile,
  DemoSession,
  EscrowPayment,
  PublicStats,
  MatchRecommendation,
  KYCQueueItem,
} from "@/lib/api";

export function useMyApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchJson<Application[]>("/applications/my-applications", token)
      .then(setApplications)
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, [token]);

  return { applications, loading };
}

export function useMyTuitionLeads() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<TuitionLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchJson<TuitionLead[]>("/tuitions/my-leads", token)
      .then(setLeads)
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, [token]);

  return { leads, loading };
}

export function useTutorProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchJson<TutorProfile>("/tutors/me/profile", token)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [token]);

  return { profile, loading, setProfile };
}

export function useOpenTuitions() {
  const { token } = useAuth();
  const [tuitions, setTuitions] = useState<TuitionLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchJson<TuitionLead[]>("/tuitions?status=OPEN", token)
      .then(setTuitions)
      .catch(() => setTuitions([]))
      .finally(() => setLoading(false));
  }, [token]);

  return { tuitions, loading };
}

export function useMyEscrow() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<EscrowPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchJson<EscrowPayment[]>("/escrow/my-payments", token)
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, [token]);

  return { payments, loading };
}

export function useTuitionApplications(tuitionId: string | null) {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !tuitionId) return;
    setLoading(true);
    fetchJson<Application[]>(`/tuitions/${tuitionId}/applications`, token)
      .then(setApplications)
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, [token, tuitionId]);

  return { applications, loading };
}

export function useDemosForApplication(applicationId: string | null) {
  const { token } = useAuth();
  const [demos, setDemos] = useState<DemoSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !applicationId) return;
    setLoading(true);
    fetchJson<DemoSession[]>(`/demos/application/${applicationId}`, token)
      .then(setDemos)
      .catch(() => setDemos([]))
      .finally(() => setLoading(false));
  }, [token, applicationId]);

  return { demos, loading };
}

export function usePublicStats() {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    fetchJson<PublicStats>("/stats/public")
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return stats;
}

export function useFeaturedTutors(limit = 3) {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<TutorProfile[]>(`/tutors?limit=${limit}&sort=rating`)
      .then(setTutors)
      .catch(() => setTutors([]))
      .finally(() => setLoading(false));
  }, [limit]);

  return { tutors, loading };
}

export function useMatchRecommendations(tuitionId: string | null) {
  const [matches, setMatches] = useState<MatchRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tuitionId) return;
    setLoading(true);
    fetchJson<MatchRecommendation[]>(`/matching/recommendations/${tuitionId}`)
      .then(setMatches)
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, [tuitionId]);

  return { matches, loading };
}

export function useKYCQueue() {
  const { token } = useAuth();
  const [queue, setQueue] = useState<KYCQueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    if (!token) return;
    fetchJson<KYCQueueItem[]>("/admin/kyc-queue", token)
      .then(setQueue)
      .catch(() => setQueue([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    reload();
  }, [token]);

  return { queue, loading, reload };
}

export function useAdminEscrow() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<EscrowPayment[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    if (!token) return;
    fetchJson<EscrowPayment[]>("/escrow", token)
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    reload();
  }, [token]);

  return { payments, loading, reload };
}
