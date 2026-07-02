# Prompt Optimization Studio

A Next.js 14 application for building, testing, and optimizing LLM prompts
across multiple providers (OpenAI, Anthropic, Google AI).

## Features

- Prompt editor with versioning and diffing
- Test suites with batch execution and A/B testing
- Analytics dashboard (cost, latency, token usage, quality scoring)
- Template gallery for reusable prompts
- Interactive playground for quick experiments

## Getting Started

```bash
cp .env.example .env.local   # fill in your values
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

See the source tree for the full layout:

- `app/` — Next.js App Router pages and API routes
- `components/` — React components grouped by feature
- `lib/` — core business logic (AI clients, optimization, testing, analytics)
- `hooks/` — shared React hooks
- `store/` — Zustand state stores
- `types/` — shared TypeScript types
- `config/` — app configuration (models, pricing, navigation)
- `prisma/` — database schema and migrations
- `tests/` — unit, integration, and e2e tests

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm start` — production build/run
- `npm run test` — unit/integration tests (Vitest)
- `npm run test:e2e` — end-to-end tests (Playwright)
- `npm run seed` — seed the database

## Docker

```bash
docker-compose up --build
```

---

This repository was generated as a project scaffold. Most files contain
`TODO` markers where real implementation is still required.
