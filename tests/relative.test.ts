import { expect, test } from "bun:test";
import { relative } from "../.";

const TESTSUITE: [[string | URL, string], URL][] = [
    [
        ["https://deno.land/std/assert/mod.ts", "./equal.ts"],
        new URL("https://deno.land/std/assert/equal.ts"),
    ],
    [
        [new URL("https://deno.land/std/assert/mod.ts"), "../async/retry.ts"],
        new URL("https://deno.land/std/async/retry.ts"),
    ],
    [
        [new URL("https://deno.land/std/assert/mod.ts"), "."],
        new URL("https://deno.land/std/assert/"),
    ],
    [
        [new URL("https://deno.land/std/assert/mod.ts"), "/"],
        new URL("https://deno.land/"),
    ],
];

test("relative", function () {
    for (const [[from, to], expected] of TESTSUITE) {
        expect(relative(from, to).href).toBe(expected.href);
    }
});