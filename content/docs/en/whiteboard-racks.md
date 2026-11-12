---
keywords: rack, server, data centre, cabling, ports, switch, patch panel, rack unit
---

# Racks and cabling

On a whiteboard you plan server racks: racks with their rack units (U), devices in them, ports on the devices and cables from port to port. Racks and devices are elements like sticky notes and shapes – combine them freely with notes, text, frames and network diagrams from the [shape library](/whiteboard-diagrams#diagrams-shape-libraries). Working together, undo, comments, presenting and the export as SVG, PNG or PDF work as for every other element.

## Adding racks

**Racks** under **+** opens the device library (on phones under **More tools**, as a sheet). At the top you add a **Rack 42U**, **Rack 24U** or a **Wall cabinet 12U** – with a click next to the last rack, or by dragging it to a spot. Several racks stand side by side this way.

A selected rack shows its **details** on the right: name, location, height in U (1–60), width (10″, 19″ or 23″), **View** front or rear, **Max. power** (W) and **Max. weight** (kg), plus the units used, the total power and weight and the list of devices. You also change the height with the handles at the top and bottom of the rack. **Front/Rear** in the bar above the rack turns it around.

## Mounting devices

The library contains servers (1, 2 and 4U), storage/NAS, switches (24 and 48 ports, 24 × SFP+, each with SFP uplinks and console), patch panels (24 and 48 ports, fibre with 24 × LC), router, firewall, UPS, PDU (1U and vertical as 0U), blanking panels, cable managers and shelves – each with height, ports, power and weight.

- **Drag** a device to a spot: over a rack it snaps to whole units, next to it it lies freely on the board.
- **Click** it (or press <kbd>Enter</kbd> in the search field) to put it into the selected rack – or the rack in the middle of the view – at the highest free place. When the rack is full, the device lies next to it.
- Move mounted devices with the mouse to other units or another rack; with <kbd>↑</kbd>/<kbd>↓</kbd> by one unit (<kbd>⇧</kbd>: five units), <kbd>⌥</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> changes the height. The handles at the top and bottom change the height in whole units too.
- **Duplicate** (<kbd>⌘</kbd> <kbd>D</kbd>) puts the copy at the next free place of the same rack. Deleting a rack deletes its devices.
- When two devices overlap or one sticks out of the rack, both are hatched red and marked with **!**; the rack counts them in its details.

Devices can have **half depth** (mounted at the front or the rear): a front and a rear device then share the same units. In the other view they only show as a dashed outline. Vertical PDUs are mounted as **0U left/right** in the side channel.

A device's **details**: name, kind, **roles**, manufacturer, model, serial number, **host name**, **IP addresses**, **MAC address**, height, position (lowest U), mounting, depth, colour, power (W), weight (kg), notes – for PDUs and UPSs also **Capacity** (W) with the current load. **Take out of the rack** puts it next to the rack.

- **Roles** are free tags with suggestions such as Docker host, hypervisor, bare metal, NAS, router or firewall.
- **IP addresses** takes one or more IPv4 or IPv6 addresses (also with `/24`), separated by commas, spaces or line breaks. Invalid entries are not saved and are pointed out when you leave the field. The **MAC address** is always stored as `aa:bb:cc:dd:ee:ff`, whether you type it with `-`, `.` or no separators.
- Network ports (RJ45, SFP/QSFP) also have their own MAC and IP address – every network card has its own.
- Hovering over a device for a moment shows a **card** with everything at a glance: name, kind, roles, host name, IP and MAC addresses (each with a copy button), manufacturer and model, height and position, power, used ports and the start of the notes. On a phone or tablet a long press opens the card, with the keyboard <kbd>I</kbd> for the selected device; <kbd>Esc</kbd> closes it.
- Search, Markdown and CSV export and the [NetBox import](/whiteboard-racks) include host name, addresses and roles (from NetBox: the primary IP with its DNS name, MAC and IP of the interfaces, role and tags). **Save as own device** leaves out host name and addresses.

**Save as own device** stores the device with its ports and values in the workspace's library (section **Own devices**). The person who saved it and owners of the workspace can delete it.

## Ports

Every device has ports with name, type (RJ45, SFP, SFP+, SFP28, QSFP+, QSFP28, LC, SC, MPO, console, USB, C13, C14, C19, C20, Schuko, DC), side (front or rear), label and VLAN. The ports of the side the rack shows are drawn; connected ports take the colour of their cable, a tooltip shows name, type and label. In the details you change or remove ports and add several at once with **Add ports** (count, type, side, prefix such as `Gi1/0/`). Clicking a port on the board shows it in the details.

## Cables

Cables are connectors whose ends sit on ports: with the **connector tool** (<kbd>L</kbd>) you drag from one port to another – also between two racks. A line that starts or ends on a port becomes a cable; its type follows the ports (power, console, fibre, DAC or Cat6a). Without drawing, use a device's details: **Connect …** at the port, then choose the device and a free port.

Cables run like in a tidy rack: from the port to the edge of its device, through the side channel and, between racks, over the top of the racks; every cable has its own lane. When two ports face each other – on the lower edge of the upper device and the upper edge of the lower one, or on the same edge of one device – and no other device is in between, the cable goes straight across instead of through the channel. Colour and stroke follow the type (e.g. OM3 aqua, OM4 violet, OS2 yellow, power thick, DAC dashed); a colour of its own takes precedence. Hovering or selecting a cable highlights both ends. **Show cables** in the view menu hides and shows all cables (the choice applies in this browser).

A cable's **details**: its two ends (a click jumps to the device and port), cable type (Cat5e, Cat6, Cat6a, Cat7, Cat8, OM3, OM4, OM5, OS2, DAC, AOC, power, console, other), colour, label, length in metres, VLAN and notes. If more than one cable is plugged into a port, the details point it out.

## Power and weight

The power and weight of the devices add up per rack (in the rack's header and details). Power cables from a PDU or UPS to a device make up the PDU's load: a device with two power supplies on two PDUs shares its power between both, a PDU on a UPS passes its whole load on to the UPS. When a rack exceeds its **Max. power** or **Max. weight**, or a PDU/UPS its capacity, a warning shows in the rack's header, on the device and in the details.

## Ports and cables at a glance

**Ports & cables** (in the view menu and the device library) shows all ports of the board as a table – rack, device, port, type, connected to, cable, VLAN – and all cables with label, type, ends, length and VLAN. Filter by text, category (network, fibre, power) and assignment (connected, free), sort by clicking the column headers; clicking a row shows the device or cable on the board. **Export as CSV** downloads the filtered list, **Print labels** prints one label per cable end (label, this end, the other end, type, length, VLAN).

## Import and export

- **Export JSON** (device library) saves the racks with devices, ports and cables – the selected ones or all – as a file; **Import JSON** places them on a board. This way you move racks to other boards and workspaces.
- **From NetBox …** fetches racks from [NetBox](https://netboxlabs.com/): enter the NetBox address, an API token (read-only is enough) and optionally a site (slug) and rack names. Flowplan queries racks, devices, device types (height, depth, weight), interfaces, front and rear ports, console and power ports and cables once and places them on the board (up to 20 racks). The address and token are used for this request only and are not stored on the server; **Remember the address and token in this browser** keeps them in your browser only. NetBox has to be reachable at a public HTTPS address – for a NetBox in the internal network see `NETBOX_ALLOW_PRIVATE` in the [configuration](/en/configuration-integrations#integrations).
- The board's **SVG, PNG and PDF export** shows the racks as they stand on the board. The **Markdown export** adds a section **Racks and cabling** to the board's SVG picture, with the devices per rack, the port assignments and the cable list as tables.

The AI and [MCP](/en/mcp) (`read_page`) read a board's racks, devices, ports and cables as text. On phones you view and edit racks: tapping selects a device, **Details** in the bar opens the details as a sheet, and the device library is under **More tools**.
