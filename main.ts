// The Excuse That Almost Works — make.fun bounty
// u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5
//
// Writes the single line a gamer texts the boss to skip work on GTA 6
// launch week to /output/entry.txt. The sandbox has no network, so the
// line is composed here, in the program, and checked against the gate
// before it is written: one line, plain text, at most 20 words, 1 to
// 140 characters, not only white space.
//
// Run: node main.ts
// Output: /output/entry.txt

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The excuse. Built to read like a text sent in a hurry: it opens
// mid-thought, names one boring, specific workplace detail (a dead
// badge reader and a security desk that needs a manager to vouch),
// and never mentions the game. The joke is the excuse's own logic:
// the person it is texted to is the manager it needs.
const EXCUSE =
  "My badge stopped working and security won't let me in till a manager vouches for me";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
const MAX_WORDS = 20;
const MAX_CHARS = 140;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function checkGate(text: string): string[] {
  const problems: string[] = [];
  if (text.length < 1 || text.length > MAX_CHARS) {
    problems.push(`length ${text.length} is outside 1-${MAX_CHARS} characters`);
  }
  if (text.trim().length === 0) {
    problems.push("text is only white space");
  }
  if (text.includes("\n")) {
    problems.push("text must be a single line");
  }
  const words = wordCount(text);
  if (words > MAX_WORDS) {
    problems.push(`${words} words exceeds the ${MAX_WORDS}-word cap`);
  }
  return problems;
}

function main(): void {
  const problems = checkGate(EXCUSE);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`gate: ${problem}`);
    }
    process.exit(1);
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");
  console.log(`wrote ${EXCUSE.length} chars, ${wordCount(EXCUSE)} words -> ${OUTPUT_PATH}`);
}

main();
