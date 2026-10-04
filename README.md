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

## Image

Every push to `main` publishes `ghcr.io/yannicschuller/flowplan-docs:latest` (and `:sha-…`) for `linux/amd64` and `linux/arm64`. The container listens on port 3000 and has a healthcheck on `/api/health`.

## License

AGPL-3.0, like Flowplan.
