---
keywords: end-to-end, e2e, encryption, password, private
---

# Encrypted spaces

An encrypted space is meant for journals, passwords and other confidential notes. Content, files and – if you choose – titles are encrypted and decrypted in your browser. The server – and with it the operators, backups and the storage provider – only sees ciphertext.

## What is protected – and what is not

| | Encrypted |
| --- | --- |
| Text of the documents | yes |
| Files and images in the documents | yes, including file name and type |
| Page titles | only with **Encrypt titles** when creating the space |
| Page structure, icons, times, sizes | no |
| Name of the space and who is a member | no |

The encryption protects against reading along on the server and in backups. It does **not** protect against a server that deliberately serves modified program code: a web app runs the code the server sends. If you do not trust the operator of an instance at all, do not edit confidential data on that instance.

## Set up your keys

With your first encrypted space – or under **Settings → Account & security → End-to-end encryption** – you set up your keys:

1. Choose a **passphrase** (at least 10 characters, ideally a whole sentence). It is not your sign-in password and never leaves your browser.
2. Keep the **recovery key** safe: 52 characters in groups of four, to **Download** or **Print**. Setup only completes once you confirm you have stored it safely.

**Important:** whoever loses the passphrase **and** the recovery key loses access to their encrypted data. Neither the administrators nor the operator can restore it – the server never saw the keys.

Under **Settings → Account & security → End-to-end encryption** you can change the passphrase and create a new recovery key (the old one stops working). Only if both are lost: **Reset keys …** at the very bottom, in the **Danger zone**. Afterwards a member has to give you access to each encrypted space again.

## Unlock and automatic locking

Encrypted pages first show **Unlock**. With the passphrase (or the recovery key plus a new passphrase) you decrypt your keys – only in this browser tab and only in memory. Reloading, **Lock now** or a period without activity (15 minutes by default, adjustable to 5, 15, 30 or 60) locks again. No readable copy stays on the device; that is why encrypted pages cannot be edited offline.

## Create a space

**Add space** → name → tick **Encrypted space**, optionally **Encrypt titles** → **Create space**. An encrypted space is always private. In the sidebar it carries a green lock.

Encrypted spaces hold **documents only**. Databases, whiteboards, dashboards and journals are not possible here (yet) – write a journal as documents, e.g. one page per month.

## Members

The lock next to the space name (or **Members** on a page) opens **Members and keys**:

- **Add**: owners of the space or of the workspace give a member the key (**Give key**). This works only while unlocked, and only for people who have already set up their own keys. New members also read all older content.
- **Remove** or **Leave space**: the space gets a new key right away; the removed person cannot read new content. **What they could decrypt before, they may have kept** – old content is not re-encrypted. Whoever is removed from the workspace loses the keys as well.

## What does not work in encrypted spaces

Everything that would need the server to read the content is switched off here and refused by the server:

- Search, AI, previews, "Related pages" and unlinked mentions
- Comments and text comments, mentions with notifications
- Share links, sharing single pages and publishing
- Version history, templates, duplicating, moving to other spaces (in or out)
- [Tags and page properties](/page-tags#tags-and-properties)
- Export as PDF, DOCX, EPUB, server-side Markdown, Git export
- Webhooks only receive the page ID, MCP clients only metadata

## Export and backup

The editor offers two ways:

- **Markdown (decrypted)**: the browser turns the page into Markdown and saves the file – the plaintext does not pass through the server.
- **Encrypted archive**: all pages of the space as ciphertext, plus your encrypted space keys and your key secured with passphrase and recovery key. Without passphrase or recovery key it is unreadable.

Regular instance backups also contain encrypted spaces only as ciphertext.

## Technical details

X25519 key pairs, AES-256-GCM, PBKDF2-SHA256 with 600,000 iterations for the passphrase, all through the browser's WebCrypto interface (current versions of Chrome, Edge, Firefox and Safari). The full design with the threat model is in [`docs/e2ee-design.md`](https://github.com/yannicschuller/flowplan/blob/main/docs/e2ee-design.md).
