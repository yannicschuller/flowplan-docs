# Flowplan documentation

The documentation of [Flowplan](https://github.com/yannicschuller/flowplan) at [docs.flowplan.org](https://docs.flowplan.org), in German and English: every feature, self-hosting, configuration and operations.

## Writing

Pages are Markdown files in `content/docs` (German) and `content/docs/en` (English, same file names). The order and the groups of the navigation are in `lib/docs.ts`. Links between pages are written as `/slug` or `/slug#anchor`; `npm test` checks that every link and anchor exists.

## Development

```bash
npm install
npm run dev
```

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `WEBSITE_URL` | `https://flowplan.org` | The logo and "Start page" link. |
| `IMPRINT_URL` | *empty* | Link to the legal notice in the footer, e.g. `https://flowplan.org/impressum`. Hidden when empty. |
| `PRIVACY_URL` | *empty* | Link to the privacy policy in the footer, e.g. `https://flowplan.org/datenschutz`. Hidden when empty. |

## Image

Every push to `main` publishes `ghcr.io/yannicschuller/flowplan-docs:latest` (and `:sha-…`) for `linux/amd64` and `linux/arm64`. The container listens on port 3000 and has a healthcheck on `/api/health`.

After pushing, the workflow rolls the new image out on Coolify. Set two repository secrets (Settings → Secrets and variables → Actions):

- `COOLIFY_WEBHOOK`: the deploy webhook of the Coolify resource (resource → **Webhooks** → Deploy Webhook, `https://<coolify>/api/v1/deploy?uuid=…&force=false`).
- `COOLIFY_TOKEN`: a Coolify API token with the *deploy* permission (**Keys & Tokens → API tokens**; API access must be on under **Settings**).

The Coolify resource must use the `:latest` image. Without the secrets the step is skipped.

## License

AGPL-3.0, like Flowplan.
