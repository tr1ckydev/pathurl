import { expect, test } from "bun:test";
import { join } from "../.";

const TESTSUITE: [[string | URL, ...string[]], URL][] = [
    [
        ["https://deno.land", "std", "assert", "mod.ts"],
        new URL("https://deno.land/std/assert/mod.ts"),
    ],
    [
        [new URL("https://deno.land"), "std", "assert", "mod.ts"],
        new URL("https://deno.land/std/assert/mod.ts"),
    ],
    [
        [new URL("https:///deno.land//std//"), "/", "/assert/", "//mod.ts"],
        new URL("https://deno.land/std/assert/mod.ts"),
    ],
    [
        ["https://deno.land///", "/"],
        new URL("https://deno.land/")
    ],
];

test("join", function () {
    for (const [[url, ...paths], expected] of TESTSUITE) {
        expect(join(url, ...paths).href).toBe(expected.href);
    }
});
