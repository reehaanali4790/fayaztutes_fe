"use client";

import React, { useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { Calendar, Clock, Video, Plus, Sparkles } from "lucide-react";

interface DemoSlot {
  date: string;
  time: string;
  mode: string;
}

const TIME_PATTERN = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)(\sPKT)?$/i;

function parseSlotDate(dateStr: string): Date | null {
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (/tomorrow/i.test(dateStr)) return tomorrow;

  const match = dateStr.match(/(\w+)\s*\((\w+)\s+(\d{1,2})\)/i);
  if (match) {
    const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const monthIdx = monthNames.findIndex((m) => m.startsWith(match[2].toLowerCase()));
    if (monthIdx >= 0) {
      const year = new Date().getFullYear();
      return new Date(year, monthIdx, parseInt(match[3], 10));
    }
  }
  return null;
}

function isFutureOrToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const slotDay = new Date(date);
  slotDay.setHours(0, 0, 0, 0);
  return slotDay >= today;
}

export default function RedesignedLightDemoSessionsPage() {
  const [availableSlots, setAvailableSlots] = useState<DemoSlot[]>([
    { date: "Tomorrow (July 29)", time: "05:00 PM PKT", mode: "Online Zoom" },
    { date: "Thursday (July 30)", time: "04:00 PM PKT", mode: "Home Visit" }
  ]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [slotError, setSlotError] = useState("");

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setSlotError("");

    const trimmedDate = newDate.trim();
    const trimmedTime = newTime.trim();

    if (!trimmedDate || !trimmedTime) {
      setSlotError("Both date and time are required.");
      return;
    }

    if (!TIME_PATTERN.test(trimmedTime)) {
      setSlotError("Time must be in format like 05:00 PM or 06:30 PM PKT.");
      return;
    }

    const parsedDate = parseSlotDate(trimmedDate);
    if (!parsedDate) {
      setSlotError("Date must be a valid future date (e.g. 2026-07-31 or Friday (July 31)).");
      return;
    }

    if (!isFutureOrToday(parsedDate)) {
      setSlotError("Cannot add slots in the past. Please choose today or a future date.");
      return;
    }

    setAvailableSlots((prev) => [...prev, { date: trimmedDate, time: trimmedTime, mode: "Home or Online" }]);
    setNewDate("");
    setNewTime("");
  };

  return (
    <TutorLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="text-center max-w-xl mx-auto space-y-2 py-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Demo Tuitions
          </h1>
          <p className="text-slate-500 text-sm">
            Choose your available time slots so FayazTutes operations and parents can schedule your 2 free demo classes.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Set Your Free Demo Availability Slots</span>
          </div>

          <form onSubmit={handleAddSlot} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(":");
                  const hour = parseInt(h, 10);
                  const ampm = hour >= 12 ? "PM" : "AM";
                  const hour12 = hour % 12 || 12;
                  setNewTime(`${hour12.toString().padStart(2, "0")}:${m} ${ampm} PKT`);
                }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Slot
              </button>
            </div>
            {slotError && (
              <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl p-2">
                {slotError}
              </p>
            )}
          </form>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Published Availability Slots ({availableSlots.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableSlots.map((slot, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    {slot.date}
                  </div>
                  <div className="text-xs text-indigo-600 font-bold">{slot.time}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{slot.mode}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-2xl mx-auto space-y-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-700 font-bold border-b border-slate-100 pb-3">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Confirmed Demo Sessions (1)
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              STATUS: ACTIVE
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-mono text-indigo-600 font-bold">FT-20263890</span>
              <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">DEMO #1</span>
            </div>
            <div className="font-bold text-slate-900 text-base">A Level Computer Science & Math</div>
            <div className="text-xs text-slate-600">📅 Tomorrow, July 29 @ 05:00 PM PKT</div>
            <a
              href="https://zoom.us/j/9876543210?pwd=fayaztutesdemo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              <Video className="w-3.5 h-3.5" />
              Launch Zoom Demo Class
            </a>
          </div>
        </div>
      </div>
    </TutorLayout>
  );
}
