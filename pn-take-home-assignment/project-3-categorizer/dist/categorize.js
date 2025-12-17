import OpenAI from "openai";
const ALLOWED_CATEGORIES = [
    "food",
    "transport",
    "utilities",
    "shopping",
    "other",
];
const ALLOWED_CATEGORY_SET = new Set(ALLOWED_CATEGORIES);
function safeJsonParse(input) {
    try {
        return JSON.parse(input);
    }
    catch {
        return undefined;
    }
}
function stripCodeFences(input) {
    // Handle ```json\n{...}\n``` or ```\n{...}\n```
    return input.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();
}
function extractFirstJsonObject(input) {
    const match = input.match(/\{[\s\S]*\}/);
    return match?.[0];
}
export function parseCategoryFromModelOutput(output) {
    const trimmed = output.trim();
    if (!trimmed)
        return "other";
    const withoutFences = stripCodeFences(trimmed);
    const direct = safeJsonParse(withoutFences);
    const extracted = direct ?? safeJsonParse(extractFirstJsonObject(withoutFences) ?? "");
    const data = extracted;
    const raw = typeof data?.category === "string" ? data.category : "";
    const category = raw.trim().toLowerCase();
    return ALLOWED_CATEGORY_SET.has(category) ? category : "other";
}
function ruleBasedCategory(description) {
    const d = description.toLowerCase();
    // Food / drinks / cafes
    if (/(กาแฟ|coffee|cafe|latte|americano|starbucks|cafe\s*amazon|ชา|tea|ข้าว|อาหาร|food|grabfood|lineman)/i.test(d)) {
        return "food";
    }
    // Transport
    if (/(เติมน้ำมัน|ปตท|gas|fuel|น้ำมัน|bts|mrt|grab\b|taxi|parking|toll)/i.test(d)) {
        return "transport";
    }
    // Utilities
    if (/(ค่าไฟ|ไฟฟ้า|electric|electricity|ค่าน้ำ|น้ำประปา|water bill|internet|เน็ตทรู|ais|true|dtac|โทรศัพท์|phone bill)/i.test(d)) {
        return "utilities";
    }
    return null;
}
function buildMessages(description) {
    const system = [
        "You are a transaction classifier.",
        "Return exactly ONE category from: food, transport, utilities, shopping, other",
        "",
        "Definitions:",
        "- food: restaurants, cafes, coffee, beverages, snacks, groceries/food items, food delivery.",
        "  Includes keywords/brands like: กาแฟ, coffee, cafe, Starbucks, Cafe Amazon, latte, americano, ชา, tea",
        "- transport: fuel, เติมน้ำมัน, gas, taxi, Grab (ride), BTS/MRT, tollway, parking.",
        "- utilities: electricity, water, internet, phone bill (recurring bills).",
        "- shopping: clothes, shoes, electronics, household goods, general purchases.",
        "- other: ONLY if none of the above fit. Use other as a last resort.",
        "",
        'You MUST output ONLY valid JSON with this exact shape: {"category":"food"}',
        "No extra keys. No explanation. No markdown. No code fences.",
        "If unsure between two categories, choose the most likely one (do NOT default to other).",
        'If the description is empty/whitespace, output {"category":"other"}.',
    ].join("\n");
    const examples = [
        { d: "กาแฟ Cafe Amazon", c: "food" },
        { d: "กาแฟ Starbucks", c: "food" },
        { d: "latte starbucks", c: "food" },
        { d: "เติมน้ำมัน ปตท", c: "transport" },
        { d: "ค่าไฟฟ้า", c: "utilities" },
        { d: "รองเท้า Nike", c: "shopping" },
        { d: "ของขวัญวันเกิด", c: "other" },
    ];
    const messages = [{ role: "system", content: system }];
    for (const ex of examples) {
        messages.push({ role: "user", content: `Transaction description: ${ex.d}` }, { role: "assistant", content: JSON.stringify({ category: ex.c }) });
    }
    messages.push({
        role: "user",
        content: `Transaction description: ${description}`,
    });
    return messages;
}
/**
 * Categorize a transaction description using an LLM (OpenAI).
 *
 * Hard requirements satisfied:
 * - Reads API key from OPENAI_API_KEY (no hardcoding)
 * - Temperature 0 for deterministic output
 * - Timeout and error handling with safe fallback to "other"
 * - Robust parsing + validation to prevent hallucinations
 */
export async function categorize(description) {
    const trimmed = description.trim();
    if (!trimmed)
        return "other";
    const ruled = ruleBasedCategory(trimmed);
    if (ruled)
        return ruled;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
        return "other";
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS ?? "8000");
    const client = new OpenAI({ apiKey });
    const controller = new AbortController();
    try {
        const response = await withTimeout(client.chat.completions.create({
            model,
            temperature: 0,
            max_tokens: 30,
            messages: buildMessages(trimmed),
        }, { signal: controller.signal }), timeoutMs, () => controller.abort());
        const content = response.choices[0]?.message?.content ?? "";
        return parseCategoryFromModelOutput(content);
    }
    catch {
        // Includes timeouts, network errors, 4xx/5xx, and parsing mishaps.
        return "other";
    }
}
async function withTimeout(promise, ms, onTimeout) {
    if (!Number.isFinite(ms) || ms <= 0)
        return promise;
    return await new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            try {
                onTimeout?.();
            }
            finally {
                reject(new Error("OpenAI request timed out"));
            }
        }, ms);
        promise.then((value) => {
            clearTimeout(id);
            resolve(value);
        }, (error) => {
            clearTimeout(id);
            reject(error);
        });
    });
}
