# PatternReveal.xyz

An AI-powered relationship pattern analysis platform that helps users identify manipulative behaviors, emotional abuse patterns, and toxic relationship dynamics through daily reflections, AI-generated insights, and shareable reports.

## What it does

Users write daily reflections about their relationships. The AI analyzes these entries to surface recurring behavioral patterns, provides expert insights, and generates detailed reports. Reflections can be shared via password-protected public links, and users can chat with an AI assistant about their entries for deeper context.

## Tech Stack

### Framework & Runtime
- **Next.js 15** (App Router, Turbopack) with **React 19**
- **TypeScript** throughout

### Database & ORM
- **PostgreSQL** (Neon serverless) with the `pgvector` extension for semantic embeddings
- **Prisma** with a multi-file schema in `prisma/schema/`

### AI & ML
- **OpenAI** via the Vercel AI SDK for pattern analysis and chat
- **LangChain** for RAG pipelines and the knowledge base
- **Hugging Face Transformers** for local embedding generation
- **pgvector** for semantic search over the knowledge base

### Auth
- **NextAuth v4** with a Prisma adapter, supporting credentials (email/password) and Google OAuth

### Payments
- **Paddle** for subscription billing with per-workspace plan and usage limits

### Background Jobs & Queues
- **Upstash QStash** for async job scheduling (AI analysis, cron tasks)
- **Upstash Redis** for rate limiting and caching

### File Storage
- **Vercel Blob** for PDF uploads used in the knowledge base

### Email
- **Resend** with **React Email** component templates

### Analytics & Observability
- **PostHog** for product analytics
- **Tinybird** for high-volume event analytics
- **Sentry** for error tracking
- **Dub** for short link generation on shareable reports

### UI
- **Tailwind CSS** with Radix UI primitives and shadcn/ui components
- **Tiptap** rich-text editor for writing reflections
- **Framer Motion** for animations
- **Chart.js** for analytics charts
- **React PDF Renderer** for PDF report generation

### Forms & Validation
- **React Hook Form** + **Zod**; **next-safe-action** for type-safe server actions

---

## Project Structure

```
app/
  (website)/          # Public marketing site (landing, pricing, help, privacy, terms)
  app/
    (dashboard)/
      (auth)/         # Login, register, email-change confirmation
      (onboarding)/   # Onboarding wizard
      (share)/        # Public shareable report pages
      [slug]/         # Workspace-scoped app: reflections, reports, analytics, settings
      account/        # User account settings
      public/         # Public report viewer
    (admin)/          # Internal admin: knowledge base management
  api/
    analyze/          # Trigger AI pattern analysis on a reflection
    chat/             # Streaming AI chat for a reflection
    cron/             # Scheduled jobs (usage reset, etc.)
    knowledgebase/    # RAG resource ingestion
    reflections/      # CRUD for reflections
    reports/          # Report generation & sharing
    workspaces/       # Workspace CRUD & invites
    webhook/          # Paddle payment webhooks
prisma/
  schema/             # Multi-file Prisma schema split by domain
components/           # Shared React components
lib/                  # Utility libraries (AI clients, db, auth, etc.)
actions/              # Next.js server actions
```

---

## Data Model Overview

- **User** — authentication, profile, email subscription status
- **Workspace** — multi-tenant container; holds plan, billing limits, and usage counters
- **WorkspaceUser** — many-to-many join with `OWNER` / `MEMBER` roles
- **Reflection** — a user's journal entry; has an `analysisStatus` lifecycle (`NOT_STARTED → IN_PROGRESS → COMPLETED / FAILED`)
- **AnalysisReport** — JSON report produced by AI analysis, linked 1:1 to a Reflection
- **Report** — sharing metadata (short link, password, expiry, search-engine indexing flag)
- **ChatMessage** — conversation history between a user and the AI about a specific Reflection
- **Mood** — daily mood check-in
- **Resource / Embedding** — RAG knowledge base: chunked text + pgvector embeddings

---

## Key Architectural Decisions

- **Multi-file Prisma schema** keeps model definitions organized by domain rather than one large file.
- **QStash** decouples AI analysis from the request cycle — heavy analysis jobs are enqueued and processed asynchronously.
- **pgvector + LangChain RAG** lets the AI ground its insights in curated relationship-psychology content from the knowledge base.
- **Workspace-based multi-tenancy** enforces per-workspace usage limits at the database level and allows future team/couples features.
- **next-safe-action** provides end-to-end type-safe server actions with built-in Zod validation.
