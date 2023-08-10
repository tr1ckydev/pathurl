import { expect, test } from "bun:test";
import { parse, ParsedURL } from "../.";

const TESTSUITE: [string | URL, ParsedURL][] = [
    [
        "https://deno.land/std/assert/mod.ts",
        {
            dir: "https://deno.land/std/assert",
            root: "https://deno.land",
            base: "mod.ts",
            name: "mod",
            ext: ".ts"
        },
    ],
    [
        new URL("https://deno.land/std/assert/mod.ts"),
        {
            dir: "https://deno.land/std/assert",
            root: "https://deno.land",
            base: "mod.ts",
            name: "mod",
            ext: ".ts"
        },
    ],
    [
        new URL("https://deno.land/std/assert/"),
        {
            dir: "https://deno.land/std",
            root: "https://deno.land",
            base: "assert",
            name: "assert",
            ext: ""
        },
    ],
    [
        new URL("https://deno.land"),
        {
            dir: "https://deno.land/",
            root: "https://deno.land",
            base: "deno.land",
            name: "deno",
            ext: ".land"
        }
    ],
];

test("parse", function () {
    for (const [url, expected] of TESTSUITE) {
        expect(parse(url)).toEqual(expected);
    }
});