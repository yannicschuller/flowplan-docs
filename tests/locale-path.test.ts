import { test } from "node:test";
import assert from "node:assert/strict";
import { pathWithoutLocale } from "../lib/locale-path";

test("the docs nav sees the same path on the server and in the browser for every language", () => {
  for (const [browser, server] of [
    ["/de/installation", "/installation"],
    ["/en/views", "/views"],
    ["/fr/first-steps", "/first-steps"],
    ["/zh/views", "/views"],
    ["/fr", "/"],
    ["/zh/", "/"],
  ])
    assert.equal(pathWithoutLocale(browser), pathWithoutLocale(server), browser);
  assert.equal(pathWithoutLocale("/french-page"), "/french-page");
  assert.equal(pathWithoutLocale("/zhx"), "/zhx");
});
