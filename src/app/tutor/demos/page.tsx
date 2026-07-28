"use client";

import React, { useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { Calendar, Clock, Video, Plus, Sparkles } from "lucide-react";

export default function RedesignedLightDemoSessionsPage() {
  const [availableSlots, setAvailableSlots] = useState([
    { date: "Tomorrow (July 29)", time: "05:00 PM PKT", mode: "Online Zoom" },
    { date: "Thursday (July 30)", time: "04:00 PM PKT", mode: "Home Visit" }
  ]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate && newTime) {
      setAvailableSlots((prev) => [...prev, { date: newDate, time: newTime, mode: "Home or Online" }]);
      setNewDate("");
      setNewTime("");
    }
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

        {/* Schedule Demo Slot Generator Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Set Your Free Demo Availability Slots</span>
          </div>

          <form onSubmit={handleAddSlot} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="e.g. Friday (July 31)"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="e.g. 06:00 PM PKT"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Slot
            </button>
          </form>

          {/* Slots List */}
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

        {/* Scheduled Demo Cards */}
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
