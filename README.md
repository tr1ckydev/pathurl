# pathurl
Node.js path API but for URLs. Works on all runtimes and platforms.



## Usage

All functions accept both a url string or a native URL object and always return a URL object wherever possible.



### basename

Return the last portion of a url.

```ts
import { basename } from "pathurl";
basename("https://deno.land/std/assert/mod.ts"); // "mod.ts"
basename("https://deno.land/"); // "deno.land"
```



### dirname

Return the parent directory url of a url path.

```ts
import { dirname } from "pathurl";
dirname("https://deno.land/std/assert/mod.ts");
// "https://deno.land/std/assert"
```



### extname

Return the extension of a url.

```ts
import { extname } from "pathurl";
extname("https://deno.land/std/assert/mod.ts"); // ".ts"
extname("https://deno.land/") // ".land"
```



### format

Generate a url from `ParsedURL` object.

```ts
import { format } from "pathurl";
format({
	dir: "https://deno.land/std/assert",
	base: "mod.ts"
}); // "https://deno.land/std/assert/mod.ts"
```



### join

Join all given a sequence of url and paths, then normalizes the resulting url.

```ts
import { join } from "pathurl";
join("https://deno.land", "std", "assert", "mod.ts");
// "https://deno.land/std/assert/mod.ts"
```



### normalize

Normalize a url, resolving `'..'` and `'.'` segments and extra `'/'`s (if any).

```ts
import { normalize } from "pathurl";
normalize("https://deno.land/std/assert//../async/retry.ts/");
// "https://deno.land/std/async/retry.ts/"
```



### parse

Return a `ParsedURL` object of the url.

```ts
import { parse } from "pathurl";
parse("https://deno.land/std/assert/mod.ts");
// {
//     dir: "https://deno.land/std/assert",
//     root: "https://deno.land",
//     base: "mod.ts",
//     name: "mod",
//     ext: ".ts"
// }
```



### relative

Return the relative url from `from` to `to` based on `from` as base url.

```ts
import { relative } from "pathurl";
relative("https://deno.land/std/assert/mod.ts", "./equal.ts");
// "https://deno.land/std/assert/equal.ts"
```



### resolve

Resolve url and path segments into an absolute url.

```ts
import { resolve } from "pathurl";
resolve("https://deno.land", "std", "assert", "mod.ts", "../assert.ts");
// "https://deno.land/std/assert/assert.ts"
```



## Building

- Clone this repository.

- Run tests and ensure that all pass along with 100% code coverage.

  ```bash
  bun test --coverage
  ```

- Build the module and output in `./dist` folder.

  ```bash
  bun run build
  ```



## License

This repository uses MIT license. See [LICENSE](https://github.com/tr1ckydev/pathurl/blob/main/LICENSE) for full license text.
