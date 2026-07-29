"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { X } from "lucide-react";

export interface SubjectPickerValue {
  curriculumId: string;
  gradeLevelId: string;
  groupId: string | null;
  subjectIds: string[];
  teachingGradeIds?: string[];
}

interface SubjectPickerProps {
  gradeLevelId: string;
  subjectIds: string[];
  onGradeLevelChange: (gradeLevelId: string) => void;
  onSubjectIdsChange: (subjectIds: string[]) => void;
  teachingGradeIds?: string[];
  onTeachingGradeIdsChange?: (gradeIds: string[]) => void;
  /** Allow tutors to accumulate subjects across multiple grade levels */
  accumulateAcrossGrades?: boolean;
  initialCurriculumId?: string;
}

export function SubjectPicker({
  gradeLevelId,
  subjectIds,
  onGradeLevelChange,
  onSubjectIdsChange,
  teachingGradeIds = [],
  onTeachingGradeIdsChange,
  accumulateAcrossGrades = false,
  initialCurriculumId,
}: SubjectPickerProps) {
  const { tree, loading, subjectName, findCurriculumForGrade } = useCatalog();

  const defaultCurriculum = initialCurriculumId || tree[0]?.id || "";
  const [curriculumId, setCurriculumId] = useState(defaultCurriculum);
  const [groupId, setGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (gradeLevelId) {
      const curr = findCurriculumForGrade(gradeLevelId);
      if (curr) setCurriculumId(curr.id);
    }
  }, [gradeLevelId, findCurriculumForGrade]);

  const grades = useMemo(
    () => tree.find((c) => c.id === curriculumId)?.grades || [],
    [tree, curriculumId]
  );

  const selectedGrade = grades.find((g) => g.id === gradeLevelId);
  const groups = selectedGrade?.groups || [];
  const activeGroup = groups.find((g) => g.id === groupId) || groups[0];
  const availableSubjects = activeGroup?.subjects || [];

  useEffect(() => {
    if (!gradeLevelId && grades.length > 0) {
      onGradeLevelChange(grades[0].id);
    }
  }, [gradeLevelId, grades, onGradeLevelChange]);

  useEffect(() => {
    if (groups.length > 0 && !groups.some((g) => g.id === groupId)) {
      setGroupId(groups[0].id);
    }
  }, [groups, groupId]);

  const toggleSubject = (id: string) => {
    const next = subjectIds.includes(id)
      ? subjectIds.filter((s) => s !== id)
      : [...subjectIds, id];
    onSubjectIdsChange(next);

    if (accumulateAcrossGrades && onTeachingGradeIdsChange && gradeLevelId) {
      const gradesSet = new Set(teachingGradeIds);
      if (next.some((sid) => availableSubjects.some((s) => s.id === sid))) {
        gradesSet.add(gradeLevelId);
      }
      onTeachingGradeIdsChange(Array.from(gradesSet));
    }
  };

  const removeSubject = (id: string) => {
    onSubjectIdsChange(subjectIds.filter((s) => s !== id));
  };

  if (loading) {
    return <p className="text-xs text-slate-500">Loading subjects catalog...</p>;
  }

  if (tree.length === 0) {
    return <p className="text-xs text-red-600">Unable to load subject catalog. Please refresh the page.</p>;
  }

  return (
    <div className="space-y-4">
      {accumulateAcrossGrades && subjectIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {subjectIds.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200"
            >
              {subjectName(id)}
              <button type="button" onClick={() => removeSubject(id)} aria-label={`Remove ${subjectName(id)}`}>
                <X className="w-3 h-3 text-red-500" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Curriculum / Board</label>
        <select
          value={curriculumId}
          onChange={(e) => {
            const nextCurr = e.target.value;
            setCurriculumId(nextCurr);
            const firstGrade = tree.find((c) => c.id === nextCurr)?.grades[0];
            if (firstGrade) {
              onGradeLevelChange(firstGrade.id);
              setGroupId(firstGrade.groups[0]?.id ?? null);
              if (!accumulateAcrossGrades) onSubjectIdsChange([]);
            }
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
        >
          {tree.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Grade Level</label>
        <select
          value={gradeLevelId}
          onChange={(e) => {
            onGradeLevelChange(e.target.value);
            const grade = grades.find((g) => g.id === e.target.value);
            setGroupId(grade?.groups[0]?.id ?? null);
            if (!accumulateAcrossGrades) onSubjectIdsChange([]);
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
        >
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      {groups.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Stream / Group</label>
          <select
            value={groupId ?? ""}
            onChange={(e) => setGroupId(e.target.value || null)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          >
            {groups.map((g) => (
              <option key={g.id ?? "all"} value={g.id ?? ""}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">
          Subjects {accumulateAcrossGrades ? "(select from catalog)" : "Needed"}
        </label>
        {availableSubjects.length === 0 ? (
          <p className="text-xs text-slate-500">No subjects available for this grade.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableSubjects.map((sub) => {
              const selected = subjectIds.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => toggleSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    selected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        )}
        {!accumulateAcrossGrades && subjectIds.length === 0 && (
          <p className="text-[11px] text-slate-500">Select at least one subject.</p>
        )}
      </div>
    </div>
  );
}

/** Compact grade + subject dropdowns for homepage search */
export function CatalogSearchSelect({
  gradeLevelId,
  subjectId,
  onGradeLevelChange,
  onSubjectIdChange,
}: {
  gradeLevelId: string;
  subjectId: string;
  onGradeLevelChange: (id: string) => void;
  onSubjectIdChange: (id: string) => void;
}) {
  const { tree, loading, findGrade } = useCatalog();
  const [curriculumId, setCurriculumId] = useState(tree[0]?.id || "");

  const grades = tree.find((c) => c.id === curriculumId)?.grades || [];
  const grade = findGrade(gradeLevelId);
  const subjects = grade?.groups.flatMap((g) => g.subjects) || [];
  const uniqueSubjects = Array.from(new Map(subjects.map((s) => [s.id, s])).values());

  useEffect(() => {
    if (!gradeLevelId && grades.length > 0) onGradeLevelChange(grades[0].id);
  }, [gradeLevelId, grades, onGradeLevelChange]);

  if (loading) return <p className="text-xs text-slate-400">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <select
        value={curriculumId}
        onChange={(e) => {
          setCurriculumId(e.target.value);
          const g = tree.find((c) => c.id === e.target.value)?.grades[0];
          if (g) {
            onGradeLevelChange(g.id);
            onSubjectIdChange("");
          }
        }}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-medium"
      >
        {tree.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        value={gradeLevelId}
        onChange={(e) => {
          onGradeLevelChange(e.target.value);
          onSubjectIdChange("");
        }}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-medium"
      >
        {grades.map((g) => (
          <option key={g.id} value={g.id}>
            {g.label}
          </option>
        ))}
      </select>
      <select
        value={subjectId}
        onChange={(e) => onSubjectIdChange(e.target.value)}
        className="w-full sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-medium"
      >
        <option value="">All subjects at this level</option>
        {uniqueSubjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
