"use client";

import React from "react";
import ParentLayout from "@/components/ParentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ParentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["PARENT", "ADMIN"]}>
      <ParentLayout>{children}</ParentLayout>
    </ProtectedRoute>
  );
}
