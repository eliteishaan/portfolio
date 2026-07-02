# Archon AI: Project Discovery Audit

_This document was generated automatically by auditing the Archon AI source code repository (`korean-ai-platform` Turborepo). It serves as the verified single source of truth for the case study content._

## 1. Project Purpose

Archon AI is an intelligent developer tools platform designed for automated code analysis, bug detection, API documentation generation, architecture visualization, and security scanning. Its primary goal is to help developers "Ship Better Code, Ship It Faster" by acting as an automated reviewer and architect.

## 2. Core Features

- **Repository Analysis**: Deep automated static code analysis across codebases to identify patterns and anti-patterns.
- **Bug Detection**: AI-driven detection of logic errors, runtime issues, and edge cases.
- **API Documentation**: Automated generation of clean, Markdown-based API docs from source code.
- **Architecture Visualization**: Interactive system diagrams (via Mermaid) for understanding complex architectures.
- **Security Scanning**: Continuous analysis for vulnerabilities, compliance issues, and exposed secrets.
- **Code Metrics**: Dashboards tracking code complexity, maintainability, reliability, and technical debt.

## 3. Technology Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Frontend Library**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (v5)
- **Monorepo Tooling**: Turborepo

## 4. AI Models & Services

- **Engine**: Google Generative AI (Gemini API)
- **Model Version**: `gemini-2.0-flash`
- **Application**: Generating JSON code analysis results, technical documentation, bug severity mappings, and Mermaid architecture diagrams.

## 5. Architecture

- **Frontend / Backend**: Unified Full-Stack architecture using Next.js App Router (React Server Components and API Routes).
- **Database**: Firebase Firestore (`firebase` client + `firebase-admin`).
- **Authentication**: Dual system—a self-contained LocalStorage demo auth system (for previews) and Firebase Auth.
- **APIs**: Internal endpoints include `/api/analyze`, `/api/api-keys`, `/api/architecture`, `/api/docs`, `/api/github`, and `/api/scanner`.

## 6. Deployment & Configuration

- **Platform**: Configured for Vercel deployment.
- **Structure**: Turborepo workspace containing an `apps/web` (Next.js) module and a `packages/types` shared package.

## 7. Major Application Modules

- **Authentication Flow**: Login, Register, 2FA, Email Verification, OTP Verification.
- **Dashboard**: User control panel featuring recent activity, repository tables, API key management, and security severity charts.

---

## Missing Information (Requires Project Owner Input)

The following details cannot be definitively verified from the source code and require owner confirmation:

1. **Live Production URL**: The deployed domain for the application.
2. **Official GitHub URL**: The public repository link to be showcased.
3. **Project Duration & Team Roles**: Timeline, hackathon context (if applicable), and specific team member contributions.
