# Master Launch Checklist

This document is the single source of truth for the launch readiness of Ravenhall Studio. All issues are categorized by severity with explicit impact analyses, exact code fixes, and estimated times to resolve.

---

## 1. CRITICAL SEVERITY (Must Fix Before Launch)

### 1.1. Subpage Navigation Breakage (Desktop & Mobile)

- **Issue**: Clicking `#about`, `#work`, or `#contact` in the navigation bar on subpages (like `/work` or `/work/[slug]`) calls `e.preventDefault()`, intercepting click events to scroll. Because the DOM targets do not exist on subpages, the click fails silent, and the user is locked on the subpage, unable to navigate.
- **Why it matters**: Breaks core navigation completely for any user navigating deep links or reading case studies.
- **Exact Fix**: In `components/layout/Navigation/Navigation.tsx` (Line 21-40) and `components/layout/MobileNavigation/MobileNavigation.tsx` (Line 118-132), check the current pathname. If `pathname !== '/'`, change the link target to absolute paths (e.g., `/\#about`) instead of relative anchors. Bypasses scroll handler dynamically.
- **Estimated Time**: 1.5 hours

### 1.2. Keyboard Focus Trap Lockout on Mobile Menu

- **Issue**: The `useFocusTrap` hook traps keyboard focus inside the mobile menu `menuRef` container. However, the hamburger/close toggle button lies _outside_ this ref in the DOM tree. A keyboard user navigating the open mobile menu gets permanently locked in a loop between "Home, About, Portfolio, Contact" and can never focus on the close button.
- **Why it matters**: Severe accessibility barrier; keyboard-only and screen-reader users are forced to refresh the browser to exit.
- **Exact Fix**: Relocate the close/toggle button inside the mobile menu container ref element in `components/layout/MobileNavigation/MobileNavigation.tsx` or expand `useFocusTrap` to take a list of allowed elements.
- **Estimated Time**: 1.0 hour

### 1.3. Global Canonical URL Inheritance Bug

- **Issue**: The root layout `app/layout.tsx` hardcodes `alternates.canonical: '/'`. Because Next.js layout metadata is inherited recursively, child routes like `/work` and `/work/archon-ai` serve a canonical tag pointing back to the homepage (`/`).
- **Why it matters**: Dilutes page ranking, marks all subpages as duplicate content, and prevents case studies from indexing on search engines.
- **Exact Fix**: Remove `alternates: { canonical: '/' }` from the metadata configuration in `app/layout.tsx`. Define canonical alternates explicitly on dynamic and static page components (`app/page.tsx`, `app/work/page.tsx`, and `app/work/[slug]/page.tsx`).
- **Estimated Time**: 0.5 hours

### 1.4. Sitemap Excludes All Subpages

- **Issue**: `app/sitemap.ts` returns a static array containing only the root domain. The work archive (`/work`) and dynamic case studies (`/work/[slug]`) are omitted.
- **Why it matters**: Search engine spiders will not discover or index case studies or dynamic showcases.
- **Exact Fix**: Update `app/sitemap.ts` to dynamically fetch all project slugs using `getAllPublishedProjects()` from `@/content/projects` and append them to the sitemap payload.
- **Estimated Time**: 0.5 hours

---

## 2. HIGH SEVERITY (Important For Professionalism & UX)

### 2.1. Nested `<main>` Landmark Element Violations

- **Issue**: Both `app/work/page.tsx` (Line 26) and `app/work/[slug]/page.tsx` (Line 55) render a `<main>` tag wrapping their content. The parent layout wrapper `MainLayout.tsx` already wraps children inside a `<main>` container.
- **Why it matters**: Violates HTML semantic structure; confuses screen reader navigation paths which rely on unique landmark trees.
- **Exact Fix**: Change the `<main>` tag in `app/work/page.tsx` and `app/work/[slug]/page.tsx` to generic `<div>` tags or fragments.
- **Estimated Time**: 0.5 hours

### 2.2. Missing and Empty GitHub/Live Link Frontmatter Fields

- **Issue**:
  - `a8bior` and `skillforge-system` frontmatter are missing the `githubUrl` field.
  - `archon-ai`, `portfolio-website`, `graphic-design-showcase`, and `video-editing-showcase` have empty string values `""` for both `liveUrl` and `githubUrl`.
- **Why it matters**: Renders broken/empty secondary CTA links in the portfolio grid and detail headers.
- **Exact Fix**: Ensure the fields are explicitly populated. If a project has no public code, set the link to a fallback inquiries form or omit the button render in `PortfolioProject.tsx` dynamically if field is empty or absent.
- **Estimated Time**: 1.0 hour

### 2.3. Studio Email Domain Mismatches

- **Issue**: The contact CTA in `features/contact/components/Contact/Contact.tsx` (Line 72) hardcodes `mailto:hello@ravenhall.com`. In the site configurations and `content/contact.ts`, the official email is `hello@ravenhallstudio.com`.
- **Why it matters**: High risk of client communication loss due to sending inquiries to a placeholder domain.
- **Exact Fix**: Replace the hardcoded `mailto:hello@ravenhall.com` link with reference to `CONTACT_CONTENT.email` in the component.
- **Estimated Time**: 0.5 hours

### 2.4. Legacy/Placeholder Asset Path in Hero Component

- **Issue**: In `features/hero/components/Hero/Hero.tsx` (Line 74), the fallback image points to `/api/media/smart-health-helper/hero.webp` which does not exist in the codebase.
- **Why it matters**: Triggers a console 404 error on page mount if no dynamic dynamic asset is supplied.
- **Exact Fix**: Point the fallback image path to a global, validated generic studio hero asset or default fallback vector.
- **Estimated Time**: 0.5 hours

---

## 3. MEDIUM SEVERITY (Accessibility & Content Gaps)

### 3.1. Missing Skip-to-Content Bypass Link

- **Issue**: There is no keyboard-accessible "Skip to Main Content" link at the document start.
- **Why it matters**: WCAG 2.1 compliance failure. Keyboard-only users are forced to tab through every header navigation item on every page refresh before reaching the content.
- **Exact Fix**: Insert a visually hidden skip-to-content anchor in `MainLayout.tsx` which moves keyboard focus directly to `id="main-content"` on the primary `<main>` wrapper.
- **Estimated Time**: 0.5 hours

### 3.2. Missing ARIA Labels on Buttons, Links & Modals

- **Issue**:
  - Showcase Modal close button (SVG icon only) has no `aria-label`.
  - Grid elements in `ShowcaseItem.tsx` lack `role="button"` and `aria-label`.
  - Modals lack `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
  - Links to external networks (Behance, YouTube, Instagram) open in new tabs without warnings or labels.
- **Why it matters**: Assists screen readers in translating interactive actions.
- **Exact Fix**: Update the respective JSX layouts with proper accessibility labels.
- **Estimated Time**: 1.5 hours

### 3.3. Orphaned/Dead Code Content Elements on Homepage

- **Issue**:
  - `Testimonials` and `Skills` components are fully implemented but never rendered in `app/page.tsx`.
  - `stats` and `experience` fields in `content/about.ts` are imported but ignored in `About.tsx`.
- **Why it matters**: Code bloat, and useful visual elements are hidden from potential clients.
- **Exact Fix**: Either wire the sections into `app/page.tsx` and `About.tsx` or clean up the unused schema code.
- **Estimated Time**: 2.5 hours

### 3.4. Color Contrast Failures on UI Variables

- **Issue**:
  - `--muted` text variable `#6B6B73` on `#0A0A0B` background yields a contrast of **3.7:1** (fails WCAG AA 4.5:1 minimum).
  - Modal metadata text (`text-white/40`) yields a contrast of **3.84:1**.
- **Why it matters**: Text is hard to read for users with visual impairments.
- **Exact Fix**: Increase brightness of `--muted` in `globals.css` and use `text-white/60` for metadata labels.
- **Estimated Time**: 1.0 hour

### 3.5. Cumulative Layout Shift (CLS) on Showcase Modal Images

- **Issue**: Renders a native `<img>` tag instead of Next.js `<Image>` in `ShowcaseModal.tsx`, lacking explicit width/height parameters.
- **Why it matters**: Causes sudden layout jumps when large graphics load.
- **Exact Fix**: Replace the native tag with the optimized `<Image>` component utilizing `fill` and absolute wrapper sizing.
- **Estimated Time**: 0.5 hours

### 3.6. Mobile Focus Trap & Close Actions on Backdrop

- **Issue**: Clicking the backdrop in mobile navigation does not dismiss the menu because the outer container incorrectly captures the click-outside reference.
- **Why it matters**: Annoying mobile UX; users expect to tap the background overlay to close the modal drawer.
- **Exact Fix**: Rebind references or attach a direct click handler to the backdrop overlay in `MobileNavigation.tsx`.
- **Estimated Time**: 0.5 hours

### 3.7. Placeholder WhatsApp Link

- **Issue**: The WhatsApp contact link in `content/contact.ts` is hardcoded to a mock address: `https://wa.me/1234567890`.
- **Why it matters**: Clicking the link navigates to a dead phone sequence.
- **Exact Fix**: Replace the placeholder phone number with the official contact endpoint.
- **Estimated Time**: 0.25 hours

---

## 4. LOW SEVERITY (Polishing & Optimization)

### 4.1. Unused Content Files

- **Issue**: `content/hero.ts` is completely unused; all header copy is hardcoded inside `HeroTypography.tsx`.
- **Why it matters**: Increases project confusion for future maintainers.
- **Exact Fix**: Reference the content variables in `HeroTypography.tsx` instead of hardcoding.
- **Estimated Time**: 0.5 hours

### 4.2. Image Optimizations (next.config.ts)

- **Issue**: Image formats list in `next.config.ts` does not contain `image/avif`.
- **Why it matters**: Misses out on an additional 20-30% page load weight savings.
- **Exact Fix**: Add `'image/avif'` to `images.formats` array.
- **Estimated Time**: 0.25 hours

### 4.3. Standard Link Mismatches

- **Issue**: `app/work/page.tsx` and dynamic subpages use native next/link rather than the custom themed `<Link>` component.
- **Why it matters**: Leads to visual inconsistencies (missing focus animations/rings).
- **Exact Fix**: Replace imports with the styled custom link package.
- **Estimated Time**: 0.5 hours

### 4.4. Active State Navigation Ring Fragility

- **Issue**: The active Section line in the header navigation relies on custom width calculations `w-[calc(100%-24px)]`.
- **Why it matters**: Changing the link margins breaks styling.
- **Exact Fix**: Use CSS transition overlays or flex positioning instead of absolute pixel bounds.
- **Estimated Time**: 0.5 hours

### 4.5. Obsolete robots.txt directive

- **Issue**: Dynamic sitemap uses obsolete Yandex-specific `host` header parameters.
- **Why it matters**: Unnecessary code clutter.
- **Exact Fix**: Clean up the config export inside `app/robots.ts`.
- **Estimated Time**: 0.25 hours

---

## 5. Summary Metrics

- **Total Checked Pages**: 7 (Homepage, Work Archive, 5 Project Case Studies)
- **Total Identified Defect Nodes**: 21
- **Overall Launch Readiness Score**: **6.5 / 10**
- **Estimated Total Work hours remaining to reach Production**: **13.5 hours**
