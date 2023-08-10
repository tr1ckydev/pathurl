import { expect, test } from "bun:test";
import { dirname } from "../.";

const TESTSUITE: [string | URL, URL][] = [
    [
        "https://deno.land/std/assert/mod.ts",
        new URL("https://deno.land/std/assert"),
    ],
    [
        new URL("https://deno.land/std/assert/mod.ts"),
        new URL("https://deno.land/std/assert"),
    ],
    [
        new URL("https://deno.land/std/assert/mod.ts?foo=bar"),
        new URL("https://deno.land/std/assert"),
    ],
    [
        new URL("https://deno.land/std/assert/mod.ts#header"),
        new URL("https://deno.land/std/assert"),
    ],
    [
        new URL("https://deno.land///"),
        new URL("https://deno.land")
    ],
];

test("dirname", () => {
    for (const [url, expected] of TESTSUITE) {
        expect(dirname(url).href).toBe(expected.href);
    }
});
