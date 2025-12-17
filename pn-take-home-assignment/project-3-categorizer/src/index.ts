import "dotenv/config";
import { categorize } from "./categorize.js";

async function main() {
  const description = process.argv.slice(2).join(" ").trim();
  if (!description) {
    console.log('Usage: npm run dev -- "กาแฟ Cafe Amazon"');
    process.exitCode = 1;
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY is not set. Set it in .env or your shell.");
    process.exitCode = 1;
    return;
  }

  const category = await categorize(description);
  console.log(category);
}

main().catch(() => {
  process.exitCode = 1;
});

