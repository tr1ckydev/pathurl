import { expect, test } from "bun:test";
import { strip } from "../.";

const cleaned = new URL("https://deno.land/std/assert/mod.ts");
const search = new URL("https://deno.land/std/assert/mod.ts?foo=bar");
const hash = new URL("https://deno.land/std/assert/mod.ts#header");
const search_hash = new URL("https://deno.land/std/assert/mod.ts?foo=bar#header");

test("clean", () => {
    strip(search);
    expect(search.href).toBe(cleaned.href);
    strip(hash);
    expect(hash.href).toBe(cleaned.href);
    strip(search_hash);
    expect(search_hash.href).toBe(cleaned.href);
});