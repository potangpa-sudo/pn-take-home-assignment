# Transaction Dashboard

A concise personal finance dashboard built with React, TypeScript, Vite, and Tailwind CSS. The application provides a minimal, responsive UI for listing transactions and summarizing income, expenses, and net balance. Core business logic is implemented as pure utility functions and covered by unit tests.

## Key Features

- Transaction list (newest-first) with date, description, and colored/ signed amounts.
- Summary cards for Total Income, Total Expense, and Net Balance.
- Responsive layout suitable for mobile and desktop screens.
- Deterministic utility functions for calculations and currency formatting, with unit tests (Vitest).

## Tech Stack

- React with Vite
- TypeScript
- Tailwind CSS
- Vitest for unit tests

## Setup Instructions

Follow these steps to install and run the project locally.

Prerequisites

- Node.js 18+ (or compatible)
- npm (or yarn)

Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd project-2-dashboard
```

2. Install dependencies:

```bash
npm install
# or: yarn install
```

Run locally

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Run tests

```bash
npm test
```

## Project Structure

```
src/
├── components/         # UI components (Dashboard, SummaryCard, TransactionList, TransactionRow)
├── data/               # mock data
├── utils/              # calculation and formatting utilities
├── App.tsx
├── main.tsx
└── types.ts            # Type definitions
```

Files to inspect first:

- `src/utils/calculations.ts` — totals and balance calculations
- `src/utils/money.ts` — currency formatting helpers
- `src/components/TransactionRow.tsx` — row rendering and date formatting

## Design Decisions

Approach

- Small, focused components: UI responsibilities are split into `SummaryCard`, `TransactionList`, and `TransactionRow` to keep rendering logic isolated and testable.
- Pure utilities: calculation and formatting logic live in `src/utils`, enabling fast unit tests and predictable behaviour.
- Utility-first styling: Tailwind CSS keeps styles consistent and avoids creating a large custom stylesheet.

Trade-offs

- Simplicity over feature completeness: the UI is intentionally minimal to keep the codebase approachable for reviewers and easy to extend.
- Hard-coded locale/currency: the demo uses `th-TH` / `THB` for formatting. This reduces complexity but limits internationalization.
- No runtime validation for data: keeping parsing simple reduces code surface but increases trust in input data correctness.

## What You'd Improve (given more time)

- Make `locale` and `currency` configurable (env vars or user preference) and add a simple toggle in the UI.
- Add runtime validation and defensive parsing for transaction input (reject malformed or out-of-range values).
- Implement end-to-end tests (Cypress/Playwright) covering add/view flows and responsive layout checks.
- Add CI with GitHub Actions to run tests and lint on push/PR.
- Add ESLint, Prettier and a commit hook (husky) to enforce code style.
- Expand data model to support categories, recurring transactions, and CSV import/export.

## Contributing

Contributions are welcome. Suggested workflow:

1. Open an issue describing the change.
2. Create a feature branch and submit a pull request.

Please include tests for business logic and keep UI changes minimal and focused.

## Contact

For questions or feedback, open an issue in this repository.

---

If you want, I can also:

- Open a PR with this README change.
- Add a GitHub Actions workflow to run tests on push.
- Make `locale` and `currency` configurable and wire a simple UI toggle.
