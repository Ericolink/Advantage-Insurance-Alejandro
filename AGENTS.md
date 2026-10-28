<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project rules

- Business data lives only in `src/config/site.ts`. Every fact has a status (`confirmed` / `pending`); never mark something confirmed without the client's written confirmation.
- Visitor-facing text lives in `src/content/en` and `src/content/es`. Both languages must have the same structure (TypeScript enforces it).
- Never invent licenses, NPN, reviews, years of experience, prices, plan benefits or regulatory (CMS/TPMO) wording.
- The contact form must never ask for Medicare/SSN numbers, dates of birth, diagnoses, medications or income.
- Files in `src/config` are imported by Node scripts/tests: use relative imports with the `.ts` extension there, no `@/` aliases.
