"use client";

import React, { useMemo } from "react";

/** Build ISO local datetime string without timezone offset for API */
export function toLocalIso(date: string, hour12: number, minute: number, ampm: "AM" | "PM"): string {
  let hour = hour12 % 12;
  if (ampm === "PM") hour += 12;
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${date}T${hh}:${mm}:00`;
}

export function formatDemoSlot(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-PK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface DateTimePickerProps {
  date: string;
  hour: string;
  minute: string;
  ampm: "AM" | "PM";
  onDateChange: (v: string) => void;
  onHourChange: (v: string) => void;
  onMinuteChange: (v: string) => void;
  onAmpmChange: (v: "AM" | "PM") => void;
  minDate?: string;
}

export function DateTimePicker({
  date,
  hour,
  minute,
  ampm,
  onDateChange,
  onHourChange,
  onMinuteChange,
  onAmpmChange,
  minDate,
}: DateTimePickerProps) {
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1)), []);
  const minutes = useMemo(() => ["00", "15", "30", "45"], []);
  const today = minDate || new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Date</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Time</label>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={hour}
            onChange={(e) => onHourChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium"
            required
          >
            <option value="" disabled>
              Hour
            </option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <select
            value={minute}
            onChange={(e) => onMinuteChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium"
            required
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={ampm}
            onChange={(e) => onAmpmChange(e.target.value as "AM" | "PM")}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <p className="text-[10px] text-slate-500">Pakistan local time (PKT) — pick HH:MM AM/PM</p>
      </div>
    </div>
  );
}
