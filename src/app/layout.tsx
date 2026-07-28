import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "FayazTutes | Pakistan's Premier Home & Online Tutor Matching Platform",
  description: "Find background-checked, verified home and online tutors across Karachi, Lahore, Islamabad, and worldwide. 2 Free Demo Classes included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased bg-slate-50 text-slate-900 font-sans min-h-screen selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
