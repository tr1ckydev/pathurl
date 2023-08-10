import { expect, test } from "bun:test";
import { resolve } from "../.";

const TESTSUITE: [[string | URL, ...string[]], URL][] = [
    [
        ["https://deno.land", "std", "assert", "mod.ts", "../assert.ts"],
        new URL("https://deno.land/std/assert/assert.ts"),
    ],
    [
        [new URL("https://deno.land"), "std", "assert", "mod.ts", "../assert.ts"],
        new URL("https://deno.land/std/assert/assert.ts"),
    ],
    [
        [new URL("https://deno.land"), "./std", "assert", "mod.ts", "../..///async/retry.ts", "../mod.ts"],
        new URL("https://deno.land/std/async/mod.ts"),
    ],
];

test("resolve", function () {
    for (const [[url, ...paths], expected] of TESTSUITE) {
        expect(resolve(url, ...paths).href).toBe(expected.href);
    }
});