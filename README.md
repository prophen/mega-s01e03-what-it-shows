# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.


## S01E03 review

The approved review splits the 412 unique source reports into 374 shared-parser reports,
33 booking-v3 form-hint reports, and five reports needing separate time/day investigation.
The original classifier’s 379/33 result remains visible; the review does not claim a proven
common root cause for the five anomalies.

- [Signed decision source](src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx)
- [Rendered decision HTML](rendered/kb/decisions/0002-dedupe-by-cause.html)
- [Recomputed evidence](evidence/analysis.json)
- Issue drafts: [parser](issues/parser.md), [form hint](issues/form-hint.md), [time/day investigation](issues/time-day.md)

To reproduce: `npm ci`, `node scripts/analyze.mjs`, `npm run build`.
To inspect the interactive KB: `npm run preview`, then open
`http://127.0.0.1:4173/kb/decisions/0002-dedupe-by-cause` (pass `-- --port 4173` if needed).
The `rendered/` directory is the complete static build with its generated assets.
Open it through a local HTTP server so root-relative assets and navigation work.
Counts are based on the supplied 4 October export; no live product tests were possible.

Filed GitHub issues: [parser #1](https://github.com/prophen/mega-s01e03-what-it-shows/issues/1),
[form hint #2](https://github.com/prophen/mega-s01e03-what-it-shows/issues/2),
[time/day investigation #3](https://github.com/prophen/mega-s01e03-what-it-shows/issues/3).
