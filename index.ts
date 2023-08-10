import { posix } from "node:path";

export interface ParsedURL {
    /**
     * The origin/root of the url such as 'https://deno.land'
     */
    root: string;
    /**
     * The full directory url path/parent path such as 'https://deno.land/std/assert' for 'https://deno.land/std/assert/mod.ts'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'mod.ts'
     */
    base: string;
    /**
     * The file extension (if any) such as '.ts'
     */
    ext: string;
    /**
     * The file name without extension (if any) such as 'mod'
     */
    name: string;
}

/**
 * Strips any hash (eg. `#header`) or search parameters (eg. `?foo=bar`) from the provided URL.
 * 
 * (Mutates the original url provided)
 * @param url url to be stripped.
 */
export function strip(url: URL) {
    url.hash = "";
    url.search = "";
}

/**
 * Return the last portion of a url. Similar to the Unix basename command.
 * Often used to extract the file name from a fully qualified url.
 *
 * @param url the url to evaluate.
 * @param suffix optionally, an extension to remove from the result.
 * @throws {TypeError} if `url` is not a valid url or if `suffix` is given and is not a string.
 */
export function basename(url: string | URL, suffix?: string) {
    url = new URL(url);
    strip(url);
    return posix.basename(url.href, suffix);
}

/**
 * Return the parent directory url of a url path. Similar to the Unix dirname command.
 *
 * @param url the url to evaluate.
 * @throws {TypeError} if `url` is not a valid url.
 */
export function dirname(url: string | URL) {
    url = new URL(url);
    strip(url);
    url.pathname = posix.dirname(url.pathname);
    return url;
}

/**
 * Return the extension of the url, from the last '.' to end of string in the last portion of the url.
 * If there is no '.' in the last portion of the path then it returns an empty string.
 *
 * @param url the url to evaluate.
 * @throws {TypeError} if `url` is not a valid url.
 */
export function extname(url: string | URL) {
    url = new URL(url);
    strip(url);
    return posix.extname(url.href);
}

/**
 * Returns a url from a url object - the opposite of parse().
 *
 * @param urlObject url object to evaluate.
 * @throws {TypeError} if result is not a valid url.
 */
export function format(urlObject: Partial<ParsedURL>) {
    return new URL(posix.format(urlObject));
}

/**
 * Join all arguments together and normalize the resulting url.
 *
 * @param url the url with which the paths are to be joined.
 * @param paths paths to join with the url.
 * @throws {TypeError} if `url` is not a valid url or if any of the path segments is not a string.
 */
export function join(url: string | URL, ...paths: string[]) {
    url = new URL(url);
    url.pathname = posix.join(url.pathname, ...paths);
    return url;
}

/**
 * Normalize a url, reducing '..' and '.' parts.
 * When multiple slashes are found, they're replaced by double slashes after protocol and remaining with a single one; when the path contains a trailing slash, it is preserved.
 *
 * @param url url to normalize.
 * @throws {TypeError} if `url` is not a valid url.
 */
export function normalize(url: string | URL) {
    url = new URL(url);
    url.pathname = posix.normalize(url.pathname);
    return url;
}

/**
 * Returns a parsed url object from a url - the opposite of format().
 *
 * @param url url to evaluate.
 * @throws {TypeError} if `url` is not a valid url.
 */
export function parse(url: string | URL): ParsedURL {
    url = new URL(url);
    strip(url);
    const parsed = posix.parse(url.href);
    parsed.root = url.origin;
    parsed.dir = dirname(url).href;
    return parsed;
}

/**
 * Solve the relative url path from {from} to {to} based on the {from} base url.
 *
 * @param from the base url.
 * @param to the relative path.
 * @throws {TypeError} if `from` is not a valid url or `to` is not a string.
 */
export function relative(from: string | URL, to: string) {
    return new URL(to, from);
}

/**
 * The right-most parameter is considered {to}. Other parameters are considered an array of {from}.
 *
 * Starting from leftmost {from} parameter, resolves {to} to an absolute url path.
 *
 * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
 * until an absolute url is found. The resulting url is normalized,
 * and trailing slashes are removed.
 *
 * @param url the base url.
 * @param paths a sequence of paths or path segments to be resolved.
 * @throws {TypeError} if `url` is not a valid url or if any of the path segments is not a string.
 */
export function resolve(url: string | URL, ...paths: string[]) {
    url = new URL(url);
    url.pathname = posix.resolve(url.pathname, ...paths);
    return url;
}