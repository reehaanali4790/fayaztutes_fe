import React from "react";

interface PortalHeroProps {
  label: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  accent?: "indigo" | "purple";
}

export function PortalHero({
  label,
  title,
  description,
  action,
  accent = "indigo",
}: PortalHeroProps) {
  const labelColor =
    accent === "purple" ? "text-purple-100" : "text-indigo-100";
  const descColor =
    accent === "purple" ? "text-purple-100" : "text-indigo-100";

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 lg:p-8 rounded-2xl shadow-xl">
      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>
        {label}
      </p>
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className={`text-sm mt-2 max-w-xl ${descColor}`}>{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
