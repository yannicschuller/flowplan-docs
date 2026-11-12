// Issues from the docs ("War das hilfreich? Nein", a search without results)
// go to the flowplan repository – all issues live there – through its
// "Documentation" issue form (blank issues are off there), with fields filled
// in by their ids. Nothing is counted or stored; it is a plain link.
export const DOCS_ISSUE_URL = "https://github.com/yannicschuller/flowplan/issues/new";

export const docsIssueUrl = (fields: { title: string; page: string; kind?: string; problem?: string }) =>
  `${DOCS_ISSUE_URL}?${new URLSearchParams({ template: "documentation.yml", ...fields })}`;
