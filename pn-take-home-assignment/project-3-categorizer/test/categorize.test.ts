import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("openai", () => {
  const createMock = vi.fn();

  class OpenAI {
    chat = { completions: { create: createMock } };
    constructor() {}
  }

  return {
    default: OpenAI,
    __createMock: createMock,
  };
});

import * as openaiModule from "openai";
import { categorize, parseCategoryFromModelOutput } from "../src/categorize.ts";

const createMock = (openaiModule as any).__createMock as ReturnType<typeof vi.fn>;

beforeEach(() => {
  createMock.mockReset();
  process.env.OPENAI_API_KEY = "test-key";
  delete process.env.OPENAI_TIMEOUT_MS;
  delete process.env.OPENAI_MODEL;
});

describe("parseCategoryFromModelOutput", () => {
  it("accepts valid JSON category", () => {
    expect(parseCategoryFromModelOutput('{"category":"food"}')).toBe("food");
  });

  it("rejects invalid category", () => {
    expect(parseCategoryFromModelOutput('{"category":"rent"}')).toBe("other");
  });

  it("rejects non-JSON output", () => {
    expect(parseCategoryFromModelOutput("food")).toBe("other");
  });

  it("extracts JSON from extra text", () => {
    expect(parseCategoryFromModelOutput('Sure: {"category":"shopping"}')).toBe(
      "shopping",
    );
  });
});

describe("categorize", () => {
  it('returns "other" for empty input without calling the API', async () => {
    const result = await categorize("   ");
    expect(result).toBe("other");
    expect(createMock).not.toHaveBeenCalled();
  });

  it('returns "other" when OPENAI_API_KEY is missing', async () => {
    delete process.env.OPENAI_API_KEY;
    const result = await categorize("กาแฟ Cafe Amazon");
    expect(result).toBe("other");
    expect(createMock).not.toHaveBeenCalled();
  });

  it("returns model category when valid", async () => {
    createMock.mockResolvedValue({
      choices: [{ message: { content: '{"category":"transport"}' } }],
    });
    await expect(categorize("เติมน้ำมัน ปตท")).resolves.toBe("transport");
  });

  it('falls back to "other" on invalid category', async () => {
    createMock.mockResolvedValue({
      choices: [{ message: { content: '{"category":"invalid"}' } }],
    });
    await expect(categorize("something")).resolves.toBe("other");
  });

  it('falls back to "other" on non-JSON output', async () => {
    createMock.mockResolvedValue({
      choices: [{ message: { content: "food" } }],
    });
    await expect(categorize("กาแฟ Cafe Amazon")).resolves.toBe("other");
  });

  it('falls back to "other" on API error', async () => {
    createMock.mockRejectedValue(new Error("OpenAI 500"));
    await expect(categorize("ค่าไฟฟ้า")).resolves.toBe("other");
  });

  it('falls back to "other" on timeout', async () => {
    process.env.OPENAI_TIMEOUT_MS = "5";
    createMock.mockImplementation(() => new Promise(() => {}));
    await expect(categorize("รองเท้า Nike")).resolves.toBe("other");
  });
});
