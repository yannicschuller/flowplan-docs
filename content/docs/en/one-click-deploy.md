---
keywords: render, digitalocean, cloud-init, vps, install script, one click
---

# Deploy in one click

No server of your own yet? Three ways to a running instance without setting up Docker by hand. All of them use the same image as the Compose file below.

| Method | Data | HTTPS and address |
| --- | --- | --- |
| [Render](#render) | SQLite on a persistent disk | Automatic, `https://<name>.onrender.com` or your domain |
| [DigitalOcean App Platform](#digitalocean-app-platform) | PostgreSQL (dev database), files in a Spaces bucket | Automatic, `https://<name>.ondigitalocean.app` or your domain |
| [Any server](#any-server-cloud-init-or-install-script) (Hetzner, Netcup, IONOS …) | SQLite in a Docker volume on the server | Caddy with a Let's Encrypt certificate for your domain |

## Render

**[Deploy to Render →](https://render.com/deploy?repo=https://github.com/yannicschuller/flowplan)**

The button reads the Blueprint [`render.yaml`](https://github.com/yannicschuller/flowplan/blob/main/render.yaml) from the repository: a web service from the image `ghcr.io/yannicschuller/flowplan:latest` in Frankfurt, a 5 GB disk on `/app/data` and the health check on `/api/health`.

1. Click the button, sign in to Render and confirm the Blueprint. The SMTP fields can stay empty (see [E-mail](/en/configuration-integrations#e-mail-smtp)).
2. Render generates `FLOWPLAN_SETUP_TOKEN`. Once the deploy is done, copy it from the service's **Environment** tab and open `https://<name>.onrender.com/register?setup=<token>` – this first account administers the instance.

**Costs:** persistent disks need a paid instance – the Blueprint uses **Starter**, the smallest one with a disk; the disk is billed per GB on top (see Render's pricing). For more than a handful of people choose a larger instance ([Sizing](/en/sizing)). On the free instance the data would be lost on every restart.

**Address:** without `APP_URL`, Flowplan uses Render's own address (`RENDER_EXTERNAL_URL`). For your own domain, add it under **Settings → Custom Domains** and set `APP_URL=https://flowplan.example.com` under **Environment** – ideally before the first account, because passkeys are bound to the address.

**Persistence and updates:** everything lives on the disk – Render runs a service with a disk as exactly one instance and stops it briefly on every deploy. Render keeps snapshots of the disk; for backups away from Render, add S3 ([Storage, S3 and backups](/en/storage-and-backups)). To update, start a **Manual Deploy**: Render pulls the `:latest` image again.

## DigitalOcean App Platform

**[Deploy to DigitalOcean →](https://cloud.digitalocean.com/apps/new?repo=https://github.com/yannicschuller/flowplan/tree/main)**

The button reads [`.do/deploy.template.yaml`](https://github.com/yannicschuller/flowplan/blob/main/.do/deploy.template.yaml): a service from the image, a PostgreSQL 16 dev database and the health check on `/api/health`, in Frankfurt (`fra`).

App Platform has **no persistent volumes**: the container's disk is reset on every deploy and restart. That is why the template uses PostgreSQL instead of SQLite (`DATABASE_URL` points at the database) and expects a bucket for files:

- **Uploads:** create a Spaces bucket and a Spaces access key, and fill in `S3_BUCKET`, `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` (`S3_ENDPOINT` is preset for Frankfurt, `https://fra1.digitaloceanspaces.com`). Flowplan then puts every file into the bucket and fetches missing ones back after a deploy. **Without a bucket, uploaded files are lost on the next deploy.**
- **`FLOWPLAN_SETUP_TOKEN`** (generate with `openssl rand -hex 24`): the first account only via `<address>/register?setup=<token>`.
- **`FLOWPLAN_ENCRYPTION_KEY`** (generate with `openssl rand -base64 32`): encrypts the files in the bucket and protects stored secrets such as API keys. It must be set here, because a `secrets.key` on the container's disk would be replaced on every deploy. Keep a copy in a password manager.
- Optional `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` (`npx web-push generate-vapid-keys`): without them, new keys are made on every deploy and push in the browser stops until people turn it on again. Push to the apps is not affected.

App Platform cannot generate secrets itself, so you enter these values when creating the app (or later under the component's **Settings → Environment Variables**). `APP_URL` is App Platform's `${APP_URL}`: the `ondigitalocean.app` address, or your domain once you add it under **Settings → Domains** – then deploy again.

**Database:** a dev database has **no backups** and is meant for trying out. For real use, upgrade it to a managed database cluster, or attach an existing one with PostgreSQL 16 or newer ([PostgreSQL](/en/postgresql)). The image ships `pg_dump` and `pg_restore`, so Flowplan's own scheduled backups work on PostgreSQL too – store them in the bucket ([Storage, S3 and backups](/en/storage-and-backups)). The connection is encrypted; `uselibpqcompat=true` in `DATABASE_URL` accepts DigitalOcean's own certificate authority, as `psql` does with `sslmode=require`. If the log reports `permission denied for schema public`, the dev database's role may not create tables – use a managed database cluster, where the database owner can ([Role without superuser rights](/en/postgresql#role-without-superuser-rights)).

**Updates:** start a new deploy (**Actions → Force Rebuild and Deploy**); App Platform pulls the `:latest` image again.

## Any server: cloud-init or install script

For a virtual server (VPS) with **Ubuntu 24.04 or Debian 12** at any provider. Most of them – Hetzner Cloud, Netcup, IONOS, DigitalOcean Droplets, Vultr, Scaleway, OVHcloud – accept a cloud-init file as **"user data"** or **"cloud config"** when you create the server.

1. Point your domain's DNS record (A, and AAAA for IPv6) to the server – with a new server, as soon as you know its address.
2. Copy [`deploy/cloud-init.yaml`](https://github.com/yannicschuller/flowplan/blob/main/deploy/cloud-init.yaml), set the one line `FLOWPLAN_DOMAIN=flowplan.example.com` and paste it as user data when creating the server.
3. After a few minutes, sign in with SSH and read `/root/flowplan-README.txt`: it holds the address and the link for the first account. Progress is logged in `/var/log/flowplan-install.log`.

On a server that already runs, the install script does the same:

```bash
curl -fsSL https://raw.githubusercontent.com/yannicschuller/flowplan/main/deploy/install.sh | sudo bash -s -- flowplan.example.com
```

What the script sets up:

- **Docker** with the Compose plugin from Docker's own package repository (skipped when it is already there).
- **`/opt/flowplan`** with `compose.yaml` (Flowplan and [Caddy](https://caddyserver.com), which fetches and renews the HTTPS certificate itself), the `Caddyfile` and a `.env` readable only by root. Its secrets are generated on the server with `openssl`: `FLOWPLAN_SETUP_TOKEN` and `FLOWPLAN_ENCRYPTION_KEY` – keep a copy of the key in a password manager, encrypted backups cannot be read without it.
- **The data** in the Docker volume `flowplan-data`. It survives updates and restarts; for backups off the server add S3 or SFTP ([Storage, S3 and backups](/en/storage-and-backups)).
- **Firewall** (ufw): only SSH, 80 and 443 stay open. On a server with a firewall of its own, run the script with `FLOWPLAN_FIREWALL=off`. Ports 80 and 443 must be free – if another web server already holds them, put Flowplan behind it instead ([Coolify and reverse proxies](/en/coolify-and-proxy)).
- **Automatic security updates** of the system (unattended-upgrades).
- **Image updates are off by default:** you update when it suits you with `cd /opt/flowplan && docker compose pull && docker compose up -d` – the administration tells you about new releases. For an automatic weekly update (Sunday night), set `FLOWPLAN_AUTO_UPDATE=weekly` in the cloud-init file (or before `bash` in the command), or later run `systemctl enable --now flowplan-update.timer`.

**Without a domain** (`FLOWPLAN_DOMAIN=` left empty, or the script without an argument), Flowplan starts at `http://<server address>` without a certificate – fine for a test, see [Without HTTPS](/installation#without-https). To switch to a domain later, point its DNS record to the server and run the script again with the domain: it sets `APP_URL` and the `Caddyfile`, and keeps the data and secrets. Do it before the first account if you can, because passkeys are bound to the address.

Further settings (e-mail, single sign-on, S3) go into `/opt/flowplan/.env`, followed by `docker compose up -d` in `/opt/flowplan` – see [Configuration](/en/configuration).
