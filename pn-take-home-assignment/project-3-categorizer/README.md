# Transaction Categorizer (LLM Integration)

Implements:

```ts
categorize(description: string): Promise<"food"|"transport"|"utilities"|"shopping"|"other">
```

The categorizer uses an OpenAI LLM call to classify a transaction description into exactly one of five categories, with safe fallbacks.

## Setup

1) Install dependencies:

```bash
npm install
```

2) Create an `.env` file (or export env vars) using `.env.example`:

```bash
cp .env.example .env
```

3) Set `OPENAI_API_KEY`.

## Environment variables

- `OPENAI_API_KEY` (required for real LLM calls)
- `OPENAI_MODEL` (optional, default: `gpt-4o-mini`)
- `OPENAI_TIMEOUT_MS` (optional, default: `8000`)

## Usage (demo CLI)

```bash
npm run dev -- "กาแฟ Cafe Amazon"
```

Output is a single label: `food | transport | utilities | shopping | other`.

## Tests

Tests are unit tests and **do not call the real OpenAI API** by default (the SDK is mocked).

```bash
npm test
```

## Design decisions

- **Chat completion + few-shot prompt**: The task is small label classification; a strict system message plus examples works well and is easy to extend.
- **Strict JSON output**: The prompt requires `{"category":"..."}` and the parser validates against an allow-list. Anything else becomes `"other"` to prevent hallucinations.
- **Error handling**: Any API error (timeouts, network, 4xx/5xx) returns `"other"` gracefully.
- **Determinism**: `temperature: 0` and small `max_tokens` keep outputs consistent.

## Prompt explanation

The prompt uses:

- A **system message** that forces *only* JSON output and constrains allowed labels.
- **Few-shot examples** (Thai + English) to ground the model:
  - `"กาแฟ Cafe Amazon"` → `food`
  - `"เติมน้ำมัน ปตท"` → `transport`
  - `"ค่าไฟฟ้า"` → `utilities`
  - `"รองเท้า Nike"` → `shopping`
  - `"ของขวัญวันเกิด"` → `other`
  - Ambiguous example: `"7-Eleven"` → `other` (rule: if unclear/general merchant, use `other`)

## Trade-offs (why not embeddings/keywords)

- **Embeddings**: Great for similarity search, but you still need a decision rule and labeled data; more setup than needed for 5 fixed labels.
- **Keyword matching**: Fast and cheap, but brittle for multilingual descriptions, merchants, misspellings, and ambiguity.
- **Chat completion**: Lowest implementation overhead for robust multilingual classification, with guardrails (strict JSON + validation) to keep output safe.

## Files

- `src/categorize.ts`: core logic + prompt + parsing/validation
- `src/index.ts`: simple CLI demo
- `test/categorize.test.ts`: unit tests with mocked OpenAI SDK

