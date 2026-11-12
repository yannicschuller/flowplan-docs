---
keywords: markdown, git, export, repository, github, emergency, readable copy
---

# Markdown export and Git

A readable copy outside Flowplan – for emergencies when the instance is down, or as an archive in a Git repository. **Administration → Markdown & Git export** chooses pages and databases; with every scheduled backup (and with **Back up now**) each becomes a Markdown ZIP with its sub-pages, comments and earlier versions:

- with S3 in the bucket under `<S3_PREFIX>/exports/`, otherwise in the data folder under `exports/`; as many are kept as backups (**Backups kept**). With `FLOWPLAN_ENCRYPTION_KEY` the ZIPs are encrypted (`.zip.enc`), the push to Git is not;
- the export reads with the permissions of the person who saved the selection – private records and journals with a PIN stay out;
- file names and paths in the ZIP contain ids, so they stay the same between runs (clean Git diff). Records start with YAML frontmatter, comments are in `<file>.comments.md`, earlier versions under `<file>.versions/`.

## Push into a Git repository

> [!IMPORTANT]
> The instance Git export (`EXPORT_GIT_*`) is deprecated. It keeps working but is replaced by the [Git export of a space](#git-export-of-a-space), which space owners set up themselves; the administration shows a notice about it. The scheduled Markdown export to S3 or the data folder stays as it is.

With these variables Flowplan pushes every export into a repository itself (Forgejo, Gitea, GitHub, GitLab) – every page in a folder of its own, one commit per run with changes:

| Variable | Meaning |
| --- | --- |
| `EXPORT_GIT_URL` | `https://` address of the repository, without credentials. |
| `EXPORT_GIT_TOKEN` | Token with write access to that repository. Only in the environment, never in the database or a backup. |
| `EXPORT_GIT_USERNAME` | User name for the token (default `flowplan`; GitLab: `oauth2`). |
| `EXPORT_GIT_BRANCH` | Branch, default `main`. An empty repository gets it on the first run. |
| `EXPORT_GIT_AUTHOR`, `EXPORT_GIT_EMAIL` | Author of the commits. |
| `EXPORT_GIT_IMPORT` | `true`: changes made in the repository since the last run are taken over before exporting. |

With `EXPORT_GIT_IMPORT=true`, changed files are handled like this:

- **Records** (`records/<database>/…md`) are updated by `flowplan.id` in the frontmatter; new files become new records.
- **Document pages** (`index.md`, `pages/…-<id>.md`) get the file's text; the previous state stays as a version.
- **Journal days** (`<journal folder>/2026/10/2026-10-27.md`) are found by their journal (the folder) and the date; `flowplan.id` in the frontmatter only counts when it names a day of the same journal. Repositories from older versions, where days were still `pages/<title>-<id>.md`, keep working: changes to those files are still taken over before the export, then the export writes the days to the new paths and removes the old files. No day is created twice; a renamed journal keeps its days because the folder is matched by its id.
- Database tables, comments and versions are copies and are not read back.

Markdown does not know every Flowplan block (such as columns). Whiteboards are in the repository as SVG images; an embedded board carries an invisible marker (`<!-- flowplan:whiteboard … -->`) that makes it an embed again when changes are taken over from Git – please leave the image and link below it in place. If you edit pages with other such blocks in Git, the previous state is in the version history. The administration shows the state of the last push (commit, changes taken over, errors).

## Git export of a space

Instead of one repository for the whole instance, the owner of a space sets up a repository for that space themselves: **Manage space → Git export** (via `…` next to the space or **Settings → Spaces**). The administration only switches the feature on:

| Variable | Default | Meaning |
| --- | --- | --- |
| `SPACE_GIT_EXPORT` | *empty* | `true` turns on the Git export of spaces. Without it, space owners don't see it and exports already set up don't run. |
| `SPACE_GIT_ALLOWED_HOSTS` | *empty* | Git servers, comma-separated, e.g. `git.example.org,codeberg.org`. When set, only these are allowed; without it, any public `https://` server. |
| `SPACE_GIT_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `SPACE_GIT_ALLOWED_HOSTS` – for example a Forgejo on the same host that the container reaches via `--add-host git.example.org:host-gateway`. Only works together with the list; every other server stays limited to public addresses. |

In the space, the owner enters:

- the **repository address** (`https://`, without credentials), **branch** (default `main`), **user name** and an **access token with write access** (GitLab: user name `oauth2`);
- the **frequency**: daily or weekly, plus **Run now**;
- optionally **comments and earlier versions** (`<file>.comments.md`, `<file>.versions/`).

What happens:

- The repository gets the [Markdown export of the space](/import-export-versions) – every top-level page in a folder of its own (`<title>-<id>/`), plus `index.md` and `README.txt`. Other files in the repository (such as `LICENSE` or CI files) stay untouched.
- One commit per run, and only when something changed; pages no longer in the space are deleted in the same commit.
- Attachments above 10 MB go along, as in the Markdown export.
- The export reads with the owner's permissions: private records of others and journals with a PIN stay out.
- Export only: Flowplan does not take over changes made in the repository.
- The settings show the last run (commit, files changed, error) and when the next one is due. A failed run is retried after an hour.

Security:

- Flowplan stores the token only encrypted (like the other [stored secrets](/configuration-storage#stored-secrets), bound to the space). After saving, the interface only shows whether one is stored; it is not in exports, and in the instance backup only encrypted. A new repository address needs the token again.
- Every address is resolved and checked: internal addresses (localhost, private networks) cannot be reached, redirects are not followed. The only exception: servers the administration lists in `SPACE_GIT_ALLOWED_HOSTS` when `SPACE_GIT_ALLOW_PRIVATE=true` is set as well – for example a Git server on the same host. Even then it stays HTTPS, with the pinned address and no redirects.
- The export ends, and token and working copy (`git-export/spaces/<space>/` in the data folder) are deleted, when the owner turns it off, leaves the workspace, becomes a guest or deletes their account – or when the space gets a new owner or moves to the trash.

**Administration → Markdown & Git export** shows how many spaces use the Git export and their last errors – without addresses or content.
