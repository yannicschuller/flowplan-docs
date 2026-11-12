---
keywords: contacts, crm, address book, vcard, carddav, ldap
---

# Contacts

A contacts database is an address book for people: every record has a profile page with a contact card, with room for notes below. Contacts can be imported from an LDAP directory and kept in sync, imported and exported as vCard, and subscribed to as an address book (CardDAV) on your phone.

## Create a contacts database

**New page → Database → Contacts**. The database comes with:

| Property | Type |
| --- | --- |
| Name | Text – the display name “First Last” |
| First name, Last name | Text |
| Company, Position | Text |
| E-mail | Email |
| Phone, Mobile | Phone |
| Street, Postal code, City, Country | Text |
| Birthday | Date |
| Tags | Multi-select |

Plus the views **All contacts** (list sorted by last name), **Table**, **Birthdays** (calendar) and **Gallery**. Records open as a full page.

- **Name**: a new record is called “New contact”. Type a full name into the title (“Anna Maria Smith”) and Flowplan fills first and last name (the last word is the last name). When you change first or last name, the title follows – until you write a different one yourself, such as “Dr. A. Smith”.
- **Birthdays** repeat yearly: the “Birthdays” calendar shows them every year, and the contact card shows the age.
- **Closed to AI**: contacts are personal data, so new contacts databases are [closed to the AI](/ai#close-pages-and-spaces-to-ai); whoever manages the page can open it. Who sees the contacts is decided, as always, by the permissions of the space and page (and, if set, [permissions per record](/databases#permissions-per-record)).

## The profile page

At the top is the **contact card**: photo (or initials), position and company, clickable buttons for e-mail (`mailto:`), phone and mobile (`tel:`), the address with a link to the map (OpenStreetMap) and the birthday. ⤓ on the right downloads the contact as a vCard. Below follow the properties for editing and the document for notes – with everything the editor can do.

The photo is the record's icon: **Change icon → Image** sets one; vCard and LDAP imports bring it along.

The contact card is a layout setting: **Adjust layout** (sliders in the record) → **Contact card on top**. That way an existing database gets a contact card too, if its properties have the IDs `firstName`, `lastName`, `company`, `email` …

## Mention contacts

Type **@** in text to find contacts like any other record. Hovering (or tapping) the mention shows a card with name, position, company, e-mail and phone – e-mail and phone are clickable – and **Open profile**. The card only shows what you may read.

## Import and export vCards

The address book icon in the database toolbar opens the **Contacts** menu:

- **Import vCard (.vcf)**: files from Apple Contacts, Google Contacts, Outlook or Thunderbird, vCard 2.1, 3.0 and 4.0, any number of contacts per file (up to 5 MB). Name, company, position, first e-mail, phone and mobile, the (work) address, birthday, categories as tags, the note as the record's text and embedded photos (JPEG/PNG up to 256 KB) are imported. Flowplan never fetches photos from a link. A card exported from this database updates its record instead of creating a new one.
- **Export all as vCard**, or – with records selected – **Export selection as vCard**: one `.vcf` file (vCard 3.0) with note and photo. Single contacts via ⤓ on the contact card. Exports only contain records and properties you may read, and appear in the security log.

## Subscribe as an address book (CardDAV)

**Contacts → Subscribe as address book (CardDAV)** turns the database into an address book in Apple Contacts, Thunderbird or DAVx⁵ (Android) – **read-only**: you make changes in Flowplan.

- **Set up access** shows the server, user name and a password that is shown only once, plus the address book's address. **Create new password** or **End access** ends the old access.
- **Set up on iPhone, iPad or Mac** downloads a configuration profile with the CardDAV account (in the app through Safari; on a computer as a QR code). The link works once and for ten minutes.
- By hand in Apple: **Settings → Contacts → Accounts → Add account → Other → CardDAV account** with server, user name and password. Discovery works through `/.well-known/carddav`.
- **Permissions**: every request checks your permissions again. You only see records and properties you may read in Flowplan; if you lose access to the database, the address book returns nothing.

## Contacts from the LDAP directory

When an LDAP directory is set up (see [Contacts from LDAP](/scim-and-ldap#contacts-from-ldap)), editors of a contacts database import people from it.

The directory is only for people of the organisation: instance administrators, accounts that sign in with LDAP, and full members (not guests) of at least one workspace someone else created. Guests of the contacts database's workspace can never browse or import it, and neither can an API token. Anyone without access sees **Import from LDAP** greyed out with the reason.

::: steps

1. **Contacts → Import from LDAP** opens the tree of organizational units (OUs) below the base DN; sub-OUs load when expanded.
2. Pick an OU: the people in it are listed on the right (search: in the OU and everything below). People already imported are marked.
3. Tick people and **import** them – or **Import the whole OU (also future members)**: everyone in the OU and its sub-OUs; new people are added by the sync.
4. **Attribute mapping** (expandable) sets which LDAP attribute fills which property; the first attribute with a value wins. Default:

:::

| Property | LDAP attributes |
| --- | --- |
| Name | `displayName`, `cn` |
| First / last name | `givenName` / `sn` |
| Company | `company`, `o` |
| Position | `title` |
| E-mail | `mail` |
| Phone / Mobile | `telephoneNumber` / `mobile` |
| Street | `street`, `streetAddress` |
| Postal code / City / Country | `postalCode` / `l` / `co`, `c` |
| Birthday | `birthDate`, `dateOfBirth` (if present) |
| Photo | `thumbnailPhoto`, `jpegPhoto` (JPEG/PNG up to 256 KB) |

Only allowed attributes can be mapped: those of the default mapping and the ones the administration allows on top (`LDAP_CONTACTS_ATTRIBUTES` or **More attributes**, see [Contacts from LDAP](/scim-and-ldap#contacts-from-ldap)). The dialog lists the allowed attributes; a mapping with any other one is refused. When the administration takes an attribute off the list again, the sync stops reading it too.

**Sync** – directory → Flowplan only:

- Flowplan syncs every hour (configurable) and on **Contacts → Sync now**; the menu shows the last result.
- Properties from the directory are **read-only** in Flowplan and marked **LDAP**; the contact card says **from LDAP**. Notes, tags and your own properties stay editable.
- When an entry disappears from the directory, the contact stays and gets the tag **No longer in directory**; when it comes back, the tag goes. A run that would mark more than half of the contacts (at least five) as gone stops instead – that is more likely a wrong configuration.
- Contacts are found again by `entryUUID` (OpenLDAP), `objectGUID` (Active Directory) or `nsUniqueId` (389 DS), otherwise by DN – renamed or moved entries keep their contact.
- To stop following an OU: **Stop following** in the import dialog; the contacts stay.
- Imports appear in the administration's security log.
