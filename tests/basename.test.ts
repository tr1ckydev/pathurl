import { expect, test } from "bun:test";
import { basename } from "../.";

const TESTSUITE: [[string | URL, string?], string][] = [
    [["https://deno.land/std/assert/mod.ts"], "mod.ts"],
    [[new URL("https://deno.land/std/assert/mod.ts")], "mod.ts"],
    [[new URL("https://deno.land/std/assert/mod.ts"), ".ts"], "mod"],
    [[new URL("https://deno.land/std/assert/mod.ts?foo=bar")], "mod.ts"],
    [[new URL("https://deno.land/std/assert/mod.ts#header")], "mod.ts"],
    [[new URL("https://deno.land///")], "deno.land"],
];

test("basename", () => {
    for (const [[url, suffix], expected] of TESTSUITE) {
        expect(basename(url, suffix)).toBe(expected);
    }
});