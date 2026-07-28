# FayazTutes Next.js Light Theme Application

Next-generation ed-tech tutor matching and management application built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide React**, and **Framer Motion**.

Inspired by global ed-tech leaders (**Preply**, **Wyzant**, **Superprof**, **MyTutor**, and **GlobalTutor**).

---

## 🚀 Key Features & Sitemap

* **Search-First Landing Page (`/`)**: Interactive search hero (subject/grade, city, mode), top tutor cards, 4-step visual timeline, parent reviews.
* **50/50 Split Authentication**:
  * Unified Login (`/auth/login`)
  * Tutor Registration Signup (`/auth/signup/tutor`)
  * Parent Registration Signup (`/auth/signup/parent`)
* **Parent Control Portal (`/parent/dashboard`)**: Active lead tracker, applicant tutor queue, demo class tracker, 1st-month escrow receipt, contact masking safeguards, 1-click tutor replacement request.
* **Parent 3-Step Lead Post Wizard (`/parent/post-tuition`)**: Step-by-step lead generator connected to AI Candidate recommendations.
* **Tutor Portal Suite (`/tutor`)**:
  * Home Dashboard (`/tutor`)
  * Tuitions Marketplace (`/tutor/tuitions`)
  * Application Kanban (`/tutor/my-tuitions`)
  * Live Status Stepper (`/tutor/status-tracking`)
  * Hired Tuitions & Earnings (`/tutor/hired`)
  * Demo Sessions Calendar (`/tutor/demos`)
  * Account & Bank Payout Setup (`/tutor/account`)
* **Admin Operator Console (`/admin`)**: KYC verification queue (CNIC & degrees review), AI lead matchmaker override, and Escrow 50% payout release manager.
* **Services Hub & Policies**: `/services`, `/about`, `/terms`.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Run Development Server
npm run dev

# Build Production Bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
