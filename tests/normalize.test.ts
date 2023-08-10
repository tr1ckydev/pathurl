import { expect, test } from "bun:test";
import { normalize } from "../.";

const TESTSUITE: [string | URL, URL][] = [
    [
        "https:///deno.land///std//assert////mod.ts",
        new URL("https://deno.land/std/assert/mod.ts"),
    ],
    [
        "https://deno.land///std//assert////mod.ts?foo=bar",
        new URL("https://deno.land/std/assert/mod.ts?foo=bar"),
    ],
    [
        "https://deno.land///std//assert////mod.ts#header",
        new URL("https://deno.land/std/assert/mod.ts#header"),
    ],
    [
        "https:///deno.land/std/assert/mod.ts/..",
        new URL("https://deno.land/std/assert/"),
    ],
    [
        new URL("https://deno.land/std/assert/../async/retry.ts/"),
        new URL("https://deno.land/std/async/retry.ts/"),
    ],
    [
        "https:/deno.land//..",
        new URL("https://deno.land")
    ],
];

test("normalize", function () {
    for (const [url, expected] of TESTSUITE) {
        expect(normalize(url).href).toBe(expected.href);
    }
});