# Project Architecture

This document defines the architectural rules, conventions, and folder ownership for this project.

## 1. Folder Ownership Rules

- \`app/\`: Next.js App Router specific files (pages, layouts, loading, error states, api routes). No business logic or UI components should be defined here.
- \`components/ui/\`: Reusable, generic, primitive UI components (e.g., Button, Container, Typography). Must not contain domain-specific logic.
- \`components/layout/\`: Global layout structures (Header, Footer, Navigation) that compose multiple UI primitives.
- \`features/\`: Domain-specific modules (e.g., \`features/portfolio\`, \`features/contact\`). Each feature directory should encapsulate its own components, hooks, and localized utilities.
- \`lib/\`: Global utilities, helpers, and configurations (e.g., \`cn.ts\`, \`polymorphic.ts\`).
- \`lib/constants/\`: Hardcoded configuration values and static data.
- \`types/\`: Global TypeScript interfaces and types.
- \`store/\`: Global state management (Zustand stores).

## 2. Components vs Features

- **Components**: Are "dumb" and presentation-focused. They receive data via props and emit events via callbacks. They are highly reusable across the entire application.
- **Features**: Are "smart" and domain-focused. They can fetch data, connect to global state, and handle complex business logic specific to a section of the application.

## 3. Separation of Concerns

- **Types**: Stored in \`types/\` or alongside the component (\`.types.ts\`). Never mixed with constants or content.
- **Constants**: Stored in \`lib/constants/\`. Used for configuration arrays, static keys, and route mappings.
- **Content**: Kept strictly separated from logic and constants, ideally fetched from a CMS or stored in dedicated content files (e.g., \`data/\`).

## 4. Animation Ownership

- **GSAP**: Used for complex, sequence-based, or scroll-driven cinematic animations (e.g., Hero reveals, parallax, Three.js orchestration).
- **Framer Motion**: Used for layout transitions, exit animations, and complex gesture-based interactive UI elements.
- **Tailwind CSS Transitions**: Used for simple micro-interactions (e.g., hover states, focus rings, simple toggles).
- _Rule of Thumb_: Prefer CSS transitions first. Escalate to Framer Motion for layout changes. Escalate to GSAP for timeline/scroll mastery.

## 5. Lenis Initialization Contract

- Lenis must be initialized globally, typically via a provider in the root layout or a high-level wrapper.
- All scroll-driven components (e.g., GSAP ScrollTrigger) must synchronize their tick with the global Lenis instance.

## 6. Naming Conventions

- **Files/Folders**: Kebab-case for standard files (\`use-scroll.ts\`). PascalCase for React component files and their folders (\`Button.tsx\`, \`Button/\`).
- **Interfaces/Types**: PascalCase, preferably without an \`I\` prefix (e.g., \`Project\`, \`ButtonProps\`).
- **Variables/Functions**: camelCase.
- **Constants**: UPPER_SNAKE_CASE (e.g., \`MAIN_NAVIGATION\`).

## 7. Import Conventions

- Use absolute imports (\`@/...\`) for all cross-directory imports.
- Relative imports (\`./\`, \`../\`) are only permitted for files within the same feature or component folder.

## 8. Coding Conventions

- **TypeScript**: Strict mode enabled. No \`any\` types unless absolutely necessary.
- **React**: Favor functional components. Keep hooks decoupled from presentation where possible. Use \`useMemo\` and \`useCallback\` to prevent unnecessary re-renders in heavy animation contexts.

## 9. Future Scalability Notes

- The architecture is modular by design. As the application grows, features can be extracted into separate workspaces if adopting a monorepo structure.
- Design tokens govern all styling, allowing for a seamless transition to multi-theme or white-label variations.
