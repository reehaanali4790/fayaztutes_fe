import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CatalogProvider } from "@/hooks/useCatalog";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FayazTutes | Pakistan's Premier Home & Online Tutor Matching Platform",
  description:
    "Find background-checked, verified home and online tutors across Karachi, Lahore, Islamabad, and worldwide. 2 Free Demo Classes included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${plusJakarta.variable} antialiased bg-slate-50 text-slate-900 font-sans min-h-screen selection:bg-indigo-500 selection:text-white`}
      >
        <AuthProvider>
          <CatalogProvider>
            {children}
            <WhatsAppFloat />
          </CatalogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
