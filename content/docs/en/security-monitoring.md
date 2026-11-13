---
keywords: security, attacks, brute force, fail2ban, crowdsec, opentelemetry, audit, logs
---

# Security and attack detection

Which security events Flowplan records, how it detects attacks and how to pass them on to logs, OpenTelemetry, fail2ban or CrowdSec.

## Security

Flowplan records security-relevant events, detects typical attacks in them and hands both to your own tools. It all works without setup; the variables below only connect it to the outside.

### What is recorded

- **Sign-in:** successful, failed, refused (limit or block), from a new device
- **Account:** password changed or reset, passkey added or removed, two-factor on or off, API token created or revoked, sessions ended, account deleted
- **Rights:** admin rights granted or removed (also through SSO or LDAP groups at sign-in), roles, invitations, accounts disabled or reset by admins
- **Sharing and data:** share links, published pages, all exports and backups
- **Refused:** requests from a foreign origin, internal addresses (SSRF), scripts in submitted content, many refused API requests from one address
- **Administration:** LDAP, SCIM, restore, extensions, domains, AI provider, alerts and other security-relevant settings

**Privacy:** for an address, the database keeps only its network (IPv4 `/24`, IPv6 `/48`) and a hash keyed with a secret of the instance – enough to group and block, not the address itself. Accounts of failed sign-ins are only stored masked (`ma***@example.com`). Events are deleted after 90 days (`FLOWPLAN_SECURITY_RETENTION_DAYS`).

### Administration → Threats & incidents

The page `/#admin/threats` (group **Security**) sums it up and refreshes every 30 seconds:

- **State:** open incidents (critical ones in red), hints on missing connections, numbers of the last 24 hours and sign-ins per hour
- **Incidents** of the detection rules, with actions right next to them: resolved, block the address or network for 24 hours, end all sessions of the person, disable the account. **Details & next steps** opens an incident's own page (`/#admin/threats/incident/<id>`): on the left what happened – why the rule fired (with its thresholds), the period, the origin and whether it is already blocked, the accounts tried, successful sign-ins in the same period (red when an account may have been taken over afterwards), networks, countries, devices and the timeline of all its events; for probing also the requested paths with answer and count (IDs and tokens replaced by `:id`, `:n` and `:token`). On the right what the incident means, when it is harmless and what to do step by step – with the matching action (block the address, end sessions, disable the account, resolve) or the link to it right at the step.
- **Addresses with failures**, **events** with filters (severity, kind) and export as CSV or JSON
- **Signed-in people** (admins first), **open ways in** (API tokens, share links, public pages of the whole instance) to revoke
- **Blocks** of addresses and networks, for a time or indefinitely. Blocked addresses only get `403` – signed-in people in them too. Your own address and network cannot be blocked.

New incidents go to all instance admins as notifications of the kind **Security incidents of the instance**. Each admin chooses how under **Settings → Notifications**: the channels (by default inbox, push, e-mail and chat apps) and whether **all incidents** or **critical only** arrive; the notification leads straight to the incident's page, and the top of the incident list says how you are notified right now. When a webhook is set up under **Monitoring → Alerts by webhook**, every incident also goes there right away (event `ops.security` with `rule` and `severity`). At most 30 reports an hour, so an attack floods nobody.

Whoever signs in with a device not seen for 90 days gets a security notice themselves – a taken-over account is often noticed by its owner first.

### Detection rules

| Rule | Trigger | Severity |
| --- | --- | --- |
| Password guessing on an account | 10 failures on one account in 15 minutes | warning |
| Many failures from one address | 20 failures from one address in 15 minutes | warning |
| Many accounts from one address | 5 different accounts from one address in 15 minutes (credential stuffing) | critical |
| Sign-in after many failures | successful sign-in after 5 failures on the same account | critical |
| Admin from a new device | an admin signs in with a device not seen for 90 days | warning |
| Two countries in a short time | sign-ins from two countries within 2 hours (needs `FLOWPLAN_COUNTRY_HEADER`) | critical |
| Rights changed | admin rights, LDAP/SCIM, restore, extensions, domains | critical |
| Encryption key reset | an account resets its key for [encrypted spaces](/en/encrypted-spaces) (passphrase and recovery key lost) – only affects its own access to those spaces | warning {since=0.9.6} |
| Several keys reset | 3 accounts reset their encryption key within an hour | critical {since=0.9.6} |
| Many exports | more than 20 exports by one person in an hour (and far above their usual) | warning |
| Probing | 60 refused API requests (401/403/404) from one address in 10 minutes | warning |
| Attacks through content | 5 refused scripts or internal addresses in an hour | warning |

The same thing within a day counts on the open incident instead of opening a new one.

### Logs (stdout, JSON)

Every event is a JSON line on stdout – Docker, Loki, Elastic, Graylog or Datadog pick them up as they are:

```json
{"ts":"2026-10-30T19:11:27.536Z","level":"warn","logger":"flowplan.security","event":"login.failure","severity":"warn","ip":"203.0.113.7","network":"203.0.113.0/24","subject":"ma***@example.com","device":"Chrome · macOS","detail":"password"}
```

More fields depending on the event: `user` (account id), `country`. The full address (`ip`) is only in this line – for fail2ban and CrowdSec. `FLOWPLAN_SECURITY_LOG=anonymous` leaves it out, `=off` writes no lines.

### OpenTelemetry

With `OTEL_EXPORTER_OTLP_ENDPOINT` (or `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`) Flowplan sends the events as OTLP logs (HTTP/JSON, `/v1/logs`) to your collector, e.g. Grafana Alloy, the OpenTelemetry Collector, Grafana Cloud, Honeycomb or Datadog. Credentials go in `OTEL_EXPORTER_OTLP_HEADERS` (`api-key=…,x-scope-orgid=…`), the service name in `OTEL_SERVICE_NAME` (default `flowplan`). The fields of the log line arrive as attributes `flowplan.*`.

### Prometheus

`/api/metrics` also has `flowplan_security_events_total{event,severity}`, `flowplan_security_incidents_open{rule,severity}` and `flowplan_security_blocks`. An alert in Prometheus or Grafana:

```yaml
- alert: FlowplanSecurityIncident
  expr: sum(flowplan_security_incidents_open{severity="critical"}) > 0
  for: 1m
```

### fail2ban

With the `journald` logging driver (`logging: { driver: journald }` in the Compose service) fail2ban reads the lines directly:

```ini
# /etc/fail2ban/filter.d/flowplan.conf
[Definition]
failregex = "logger":"flowplan\.security","event":"login\.(failure|refused)","severity":"[a-z]+","ip":"<HOST>"
            "logger":"flowplan\.security","event":"request\.probing","severity":"[a-z]+","ip":"<HOST>"

# /etc/fail2ban/jail.d/flowplan.conf
[flowplan]
enabled = true
backend = systemd
journalmatch = CONTAINER_NAME=flowplan
filter = flowplan
maxretry = 10
findtime = 10m
bantime = 1h
```

When fail2ban blocks in the firewall in front of the reverse proxy, the request never arrives. The blocks in Flowplan itself also work behind Cloudflare or a proxy fail2ban does not control.

### CrowdSec

A parser for the log lines and a scenario for password guessing (example; the acquisition with `labels: { type: flowplan }`):

```yaml
# parsers/s01-parse/flowplan.yaml
name: flowplan/flowplan-logs
description: "Flowplan security events"
filter: "evt.Line.Labels.type == 'flowplan'"
onsuccess: next_stage
nodes:
  - filter: "UnmarshalJSON(evt.Line.Raw, evt.Unmarshaled, 'flowplan') in ['', nil] && evt.Unmarshaled.flowplan.logger == 'flowplan.security'"
    statics:
      - meta: log_type
        expression: "'flowplan_' + replace(evt.Unmarshaled.flowplan.event, '.', '_')"
      - meta: source_ip
        expression: evt.Unmarshaled.flowplan.ip

# scenarios/flowplan-bf.yaml
type: leaky
name: flowplan/login-bf
description: "Flowplan password guessing"
filter: "evt.Meta.log_type in ['flowplan_login_failure', 'flowplan_login_refused']"
groupby: evt.Meta.source_ip
capacity: 10
leakspeed: 30s
blackhole: 5m
labels:
  remediation: true
```

### More variables

| Variable | Default | Effect |
| --- | --- | --- |
| `FLOWPLAN_SECURITY_LOG` | `on` | `on` (with address), `anonymous` (without), `off` (no log lines) |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | How long events stay in the database (at least 7) |
| `FLOWPLAN_COUNTRY_HEADER` | *empty* | The proxy's header with the country of the request, e.g. `CF-IPCountry` behind Cloudflare – turns on the rule "two countries". Only set it when the proxy sets the header itself. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *empty* | OTLP collector for the events (see above) |
| `OTEL_EXPORTER_OTLP_LOGS_HEADERS` | `OTEL_EXPORTER_OTLP_HEADERS` | Headers for the collector, for the logs only: `api-key=abc,x-scope=flowplan` (comma-separated, values URL-encoded). Without it, `OTEL_EXPORTER_OTLP_HEADERS` applies. |

Everything with addresses needs the reverse proxy to set `X-Forwarded-For` and a correct `FLOWPLAN_TRUSTED_PROXIES` ([Configuration](/en/configuration)). When no address arrives, the page shows a hint.
