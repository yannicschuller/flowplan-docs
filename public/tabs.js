// Tabs in the docs pages ("::: tabs" in the Markdown, lib/markdown-blocks.ts).
// The page arrives with every panel visible under its own heading; this
// script turns each group into tabs (WAI-ARIA tabs pattern, arrow keys,
// Home/End). A choice is remembered in this browser only (localStorage, no
// cookie, nothing sent anywhere) and preselected in every group – on this
// page and on the next – that has the same tab, e.g. "android".
// Loaded only by pages that contain tabs.
(() => {
  const STORE = "flowplan-docs-tab";
  const read = () => {
    try {
      return localStorage.getItem(STORE);
    } catch {
      return null;
    }
  };
  const write = (key) => {
    try {
      localStorage.setItem(STORE, key);
    } catch {}
  };
  const groups = [];

  function select(group, key, focus) {
    for (const tab of group.tabs) {
      const on = tab.dataset.tab === key;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      if (on && focus) tab.focus();
    }
  }
  // Pick a tab in one group and the same tab in all others, keeping the
  // clicked tab where it is on the screen while groups above change height.
  function choose(group, key, focus) {
    const tab = group.tabs.find((t) => t.dataset.tab === key);
    const before = tab.getBoundingClientRect().top;
    select(group, key, focus);
    for (const other of groups) if (other !== group && other.tabs.some((t) => t.dataset.tab === key)) select(other, key, false);
    const shift = tab.getBoundingClientRect().top - before;
    if (shift) window.scrollBy(0, shift);
    write(key);
  }

  function setup() {
    const saved = read();
    for (const root of document.querySelectorAll("[data-tabs]:not([data-ready])")) {
      const panels = [...root.children].filter((el) => el.classList.contains("tab-panel"));
      if (panels.length < 2) continue;
      const list = document.createElement("div");
      list.className = "tab-list";
      list.setAttribute("role", "tablist");
      const group = { root, tabs: [] };
      for (const panel of panels) {
        const title = panel.querySelector(":scope > .tab-title");
        const tab = document.createElement("button");
        tab.type = "button";
        tab.id = `${panel.id}-tab`;
        tab.dataset.tab = panel.dataset.tab;
        tab.textContent = title ? title.textContent : panel.dataset.tab;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tab.id);
        panel.tabIndex = 0;
        list.append(tab);
        group.tabs.push(tab);
      }
      list.addEventListener("click", (event) => {
        const tab = event.target.closest('[role="tab"]');
        if (tab) choose(group, tab.dataset.tab, false);
      });
      list.addEventListener("keydown", (event) => {
        const i = group.tabs.indexOf(document.activeElement);
        if (i < 0) return;
        const n = group.tabs.length;
        const next = { ArrowRight: i + 1, ArrowLeft: i - 1 + n, Home: 0, End: n - 1 }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        choose(group, group.tabs[next % n].dataset.tab, true);
      });
      root.prepend(list);
      root.dataset.ready = "";
      groups.push(group);
      const first = group.tabs[0].dataset.tab;
      select(group, group.tabs.some((t) => t.dataset.tab === saved) ? saved : first, false);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
  else setup();
})();
