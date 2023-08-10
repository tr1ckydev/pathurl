import { expect, test } from "bun:test";
import { format, ParsedURL } from "../.";

const TESTSUITE: [Partial<ParsedURL>, URL][] = [
    [
        {
            dir: "https://deno.land/std/assert",
            base: "mod.ts"
        },
        new URL("https://deno.land/std/assert/mod.ts")
    ],
    [
        {
            dir: "https://deno.land/std",
            name: "assert"
        },
        new URL("https://deno.land/std/assert")
    ]
];

test("format", () => {
    for (const [urlObject, expected] of TESTSUITE) {
        expect(format(urlObject).href).toBe(expected.href);
    }
});