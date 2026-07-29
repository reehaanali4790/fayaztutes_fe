"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div>
          {subtitle && (
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              {subtitle}
            </div>
          )}
          <h3 className="text-xl font-extrabold text-slate-900 pr-8">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}
