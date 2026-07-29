"use client";

import React from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  accent?: "indigo" | "purple";
}

export function Tabs({ tabs, active, onChange, accent = "indigo" }: TabsProps) {
  const activeColor = accent === "purple" ? "border-purple-600 text-purple-600" : "border-indigo-600 text-indigo-600";
  return (
    <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition",
            active === tab.id
              ? activeColor
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          {tab.label}
          {tab.count !== undefined && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}
