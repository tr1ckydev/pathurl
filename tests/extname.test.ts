import { expect, test } from "bun:test";
import { extname } from "../.";

const TESTSUITE = [
    ["https://deno.land/std/assert/mod.ts", ".ts"],
    [new URL("https://deno.land/std/assert/mod.ts"), ".ts"],
    [new URL("https://deno.land/std/assert/mod.ts?foo=bar"), ".ts"],
    [new URL("https://deno.land/std/assert/mod.ts#header"), ".ts"],
    [new URL("https://deno.land/std/assert/mod."), "."],
    [new URL("https://deno.land/std/assert/mod"), ""],
    [new URL("https://deno.land///."), ".land"],
];

test("extname", () => {
    for (const [url, expected] of TESTSUITE) {
        expect(extname(url)).toBe(expected);
    }
});