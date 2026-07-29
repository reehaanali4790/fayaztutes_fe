"use client";

import React from "react";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TutorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>{children}</TutorLayout>
    </ProtectedRoute>
  );
}
