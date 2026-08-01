"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/teachingOptions";

export function WhatsAppFloat() {
  return (
    <a
      href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi FayazTutes! I need help finding a tutor / joining as a tutor.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp ${WHATSAPP_DISPLAY}`}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-3 pr-4 py-3 shadow-lg hover:bg-[#1ebe57] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
