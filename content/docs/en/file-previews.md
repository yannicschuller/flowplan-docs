---
keywords: preview, 3d, cad, stl, step, obj, gltf, 3mf, iges, dxf, dwg, drawing, layer, measure, html, scripts, spreadsheet, csv, excel, xlsx
---

# File previews

Open 3D models, CAD and 2D drawings, HTML files and spreadsheets right in Flowplan – no download, no extra program.

## 3D and CAD files {since=0.11.0}

Flowplan shows **STL**, **OBJ**, **glTF/GLB**, **3MF**, **STEP/STP** and **IGES/IGS** files in the 3D viewer instead of only offering them as downloads. Upload such a file to a document and a card with a cube icon and **Open in 3D viewer** appears; a click opens the viewer. The same goes for 3D files in **Media** (filter **3D/CAD**), in files properties of databases, in links to such files and on published pages. In editable text, a link opens the viewer with <kbd>⌘</kbd>-click.

- **Turn, pan, zoom**: dragging with the mouse turns the model, the right mouse button (or <kbd>Ctrl</kbd>/<kbd>⌘</kbd> while dragging) pans it, the wheel zooms at the pointer. On touch devices one finger turns, two fingers zoom and pan. With the keyboard focus on the 3D view, the arrow keys pan; <kbd>+</kbd>/<kbd>−</kbd> zoom, <kbd>0</kbd> goes to the home view, <kbd>Esc</kbd> closes the viewer.
- **Views**: **Front**, **Top**, **Side** and **Iso** show the whole model from the front, from above, from the right and at an angle from above (isometric). STL, 3MF, STEP and IGES have Z pointing up (as in CAD programs), glTF and OBJ Y. The house icon (**Home view**) returns to the isometric view, **Fit to view** shows the whole model from the current direction.
- **Dimensions**: the bottom bar shows the edges of the bounding box (width × depth × height) and the number of triangles.
- **Measure**: after **Measure**, click (or tap) two points on the surface; a line connects them, a label gives the distance, and the list at the bottom collects all measurements. Dragging still turns the model. The trash icon clears all measurements, the **×** next to one removes only that one.
- **Wireframe** shows the model's triangles instead of its surfaces.
- **Units**: the CAD reader converts STEP and IGES to millimetres, glTF/GLB is in metres, 3MF names its own unit. STL and OBJ store no unit – Flowplan assumes millimetres and says so.
- **Size**: the viewer opens meshes (STL, OBJ, glTF/GLB, 3MF) up to 200 MB and STEP/IGES up to 100 MB; larger files can still be downloaded. What you may upload depends on the maximum file size set by the administration. glTF files must be self-contained (best as GLB); models compressed with Draco or KTX2 are not shown.
- **Offline**: for STEP and IGES, Flowplan loads the CAD reader (OpenCascade, about 7 MB) from its own server the first time – never from a third party. It is not part of the [offline copy](/offline-and-apps), so without a connection STEP and IGES files open only once the reader has been loaded. STL, OBJ, glTF and 3MF also work offline once the file is on the device.

The file is read in the browser, large ones in a separate thread so the page stays responsive; the original stays unchanged, and **Download** gets it.

### 2D drawings: DXF and DWG {since=0.11.0}

Flowplan opens technical drawings in **DXF** and **DWG** format (AutoCAD and many other CAD programs) in the drawing viewer. The card in the document has a blueprint icon and **Open in drawing viewer**; otherwise everything works as for 3D files – also in **Media** (filter **3D/CAD**), in files properties and on published pages.

- **Pan and zoom**: dragging (with the mouse or a finger) pans the drawing, the wheel or two fingers zoom. With the keyboard focus on the drawing, the arrow keys pan; <kbd>+</kbd>/<kbd>−</kbd> zoom, <kbd>0</kbd> fits the whole drawing, <kbd>Esc</kbd> closes.
- **Layers**: **Layers** opens the list of all layers with their colour and number of objects; a checkbox shows or hides a layer, **All on** and **All off** switch them all. Layers that are off or frozen in the drawing start hidden. **Fit to view** shows everything that is visible.
- **Shown** are lines, polylines (also with arcs), circles, arcs, ellipses, splines (approximated), texts and multiline texts (without fonts), blocks with their position, rotation, scale and arrays, dimensions (as the CAD program drew them), hatches (solid fills filled, patterns as a light area) and filled areas (SOLID). Colours come from the drawing (colour index, true colours, BYLAYER, BYBLOCK), and so do linetypes such as dashed. Objects drawn in white appear black on white paper. 3D solids, images and tables are not shown – the bottom bar says how many objects that affects; layouts (paper space) are left out, the viewer shows the model space.
- **Paper**: the moon icon switches to dark paper, the sun back to white.
- **Measure**: after **Measure**, click (or tap) two points. Each point snaps to the nearest end, vertex or centre close by, so measurements are exact; the list at the bottom gives the distance and the distances along X and Y.
- **Unit and size**: the drawing names its own unit (millimetres, inches, metres …); without one, the viewer measures in drawing units and says so. The bottom bar shows the size of the visible drawing.
- **File size**: DXF up to 100 MB, DWG up to 50 MB. Very large drawings are shown only in part, and the viewer says so. Binary DXF files are not read – save them as DXF in text format.
- **DWG**: for DWG, Flowplan loads a DWG reader (LibreDWG, about 11 MB) from its own server the first time; it is not part of the [offline copy](/offline-and-apps), so DWG files need a connection the first time. DXF also works offline. DWG files from AutoCAD R14 up to the current format (unchanged since AutoCAD 2018) are read, older ones from R11/R12 mostly too. If a file cannot be read, the viewer says so – **then export the drawing as DXF from your CAD program** and upload that file; the viewer reads DXF from any version.

## HTML files {since=0.11.0}

Open an **HTML file** with **Open preview** – in documents, **Media**, files properties and published pages. The preview is isolated: **scripts and external content are switched off**, and the page cannot reach your data; embedded pictures and its own styles are shown. **Run scripts** runs them isolated, without network; `FLOWPLAN_HTML_PREVIEW_SCRIPTS=0` hides it. {since=0.11.1} **Always allow for this file** remembers that in your account: the file then opens with its scripts running on all your devices (just as isolated), while others are still asked. If the file changes, Flowplan asks again; untick the box to forget it. You see and clear your list under **Settings → Security check → HTML files with scripts**. This never applies to share links, published pages or instances with scripts switched off. Up to 5 MB (`FLOWPLAN_HTML_PREVIEW_MB`); a download opened in a browser is not protected.

## Spreadsheets {since=0.11.0}

Open a **CSV** or **Excel file** (`.xlsx`) with **Open preview** – in documents, **Media**, files properties and published pages. The view is read-only: sheets as tabs, a filter for rows, sorting by a click on a column letter. Up to 5,000 rows and 200 columns of files up to 20 MB (`FLOWPLAN_SHEET_PREVIEW_MB`); formulas show their saved result. Old `.xls` files are downloaded.
