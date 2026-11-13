// The latest released Flowplan version, from GitHub's "latest release" (a
// published release, never a draft or pre-release). scripts/app-files.mjs
// writes it into content/release.json before every build; lib/release.ts
// compares the pages' version markers ({since=0.9.6}) with it.
//
// FLOWPLAN_RELEASE_API points to another address (tests, a mirror);
// GITHUB_TOKEN, when set, avoids the API's limit for anonymous requests.
// When the API says no (rate limit on shared build machines), the release
// page answers too: /releases/latest redirects to /releases/tag/vX.Y.Z.
export const RELEASE_API = "https://api.github.com/repos/yannicschuller/flowplan/releases/latest";
export const RELEASE_PAGE = "https://github.com/yannicschuller/flowplan/releases/latest";

// "v0.9.5" or "0.9.5" → "0.9.5"; anything else is not a release.
export function releaseVersion(tag) {
  const m = /^v?(\d+\.\d+\.\d+)$/.exec(String(tag ?? "").trim());
  return m ? m[1] : undefined;
}

// GitHub's answer → the content of content/release.json.
export function parseRelease(data) {
  if (!data || typeof data !== "object") throw new Error("not a release");
  if (data.draft || data.prerelease) throw new Error(`${data.tag_name} is a draft or pre-release`);
  const version = releaseVersion(data.tag_name);
  if (!version) throw new Error(`tag "${data.tag_name}" is not vX.Y.Z`);
  return { version, tag: data.tag_name, published: typeof data.published_at === "string" ? data.published_at : null };
}

export async function fetchLatestRelease({ fetch: get = fetch, url = process.env.FLOWPLAN_RELEASE_API || RELEASE_API, page = RELEASE_PAGE, token = process.env.GITHUB_TOKEN } = {}) {
  try {
    return await fromApi(get, url, token);
  } catch (error) {
    if (!page) throw error;
    const res = await get(page, { method: "HEAD", redirect: "follow", headers: { "User-Agent": "flowplan-docs-build" }, signal: AbortSignal.timeout(10000) });
    const tag = /\/releases\/tag\/([^/?#]+)$/.exec(new URL(res.url || page).pathname)?.[1];
    const version = res.ok && tag ? releaseVersion(decodeURIComponent(tag)) : undefined;
    if (!version) throw new Error(`${error.message}; release page: ${res.ok ? `no release tag in ${res.url}` : `HTTP ${res.status}`}`);
    return { version, tag: decodeURIComponent(tag), published: null };
  }
}

async function fromApi(get, url, token) {
  const ask = (auth) => {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "flowplan-docs-build" };
    if (auth) headers.Authorization = `Bearer ${auth}`;
    return get(url, { headers, signal: AbortSignal.timeout(10000) });
  };
  let res = await ask(token);
  // A token that does not fit (expired, another host's) – the repository is
  // public, so ask again without it.
  if (token && (res.status === 401 || res.status === 403)) res = await ask("");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseRelease(await res.json());
}

export const releaseFile = (release) => JSON.stringify(release, null, 2) + "\n";
