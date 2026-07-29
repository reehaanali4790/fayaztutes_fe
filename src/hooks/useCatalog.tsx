"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

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

interface CatalogContextValue {
  tree: CatalogCurriculum[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  findGrade: (gradeLevelId: string) => CatalogGrade | undefined;
  findCurriculumForGrade: (gradeLevelId: string) => CatalogCurriculum | undefined;
  subjectName: (subjectId: string) => string;
  allSubjects: CatalogSubject[];
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [tree, setTree] = useState<CatalogCurriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/tree`);
      if (!res.ok) throw new Error("Failed to load catalog");
      const data = await res.json();
      setTree(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load catalog");
      setTree([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const findGrade = useCallback(
    (gradeLevelId: string) => {
      for (const curr of tree) {
        const grade = curr.grades.find((g) => g.id === gradeLevelId);
        if (grade) return grade;
      }
      return undefined;
    },
    [tree]
  );

  const findCurriculumForGrade = useCallback(
    (gradeLevelId: string) => {
      for (const curr of tree) {
        if (curr.grades.some((g) => g.id === gradeLevelId)) return curr;
      }
      return undefined;
    },
    [tree]
  );

  const allSubjects = useMemo(() => {
    const map = new Map<string, CatalogSubject>();
    for (const curr of tree) {
      for (const grade of curr.grades) {
        for (const group of grade.groups) {
          for (const sub of group.subjects) {
            map.set(sub.id, sub);
          }
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [tree]);

  const subjectName = useCallback(
    (subjectId: string) => allSubjects.find((s) => s.id === subjectId)?.name || subjectId.replace(/_/g, " "),
    [allSubjects]
  );

  const value = useMemo(
    () => ({ tree, loading, error, refresh, findGrade, findCurriculumForGrade, subjectName, allSubjects }),
    [tree, loading, error, refresh, findGrade, findCurriculumForGrade, subjectName, allSubjects]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return ctx;
}
