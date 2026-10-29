# booking-v3 shows MM/DD/YYYY to day-first tenants — 33 reports

## Scope

33 unique reports from source ticket #4471. All 33 are form reports from alder.physio, copper.studio or pale.harbour running booking-v3. Its MM/DD/YYYY hint conflicts with tenant-local parsing. Fifteen were intake-tagged parser; tenant configuration and form version reveal the separate path.

## Evidence

- R-41230 — copper.studio, form, 2026-04-17: My client came on 1 June instead of 6 January. We sorted it out.
- R-41241 — alder.physio, form, 2026-04-21: We had two people show up on 8 June. They were booked for 6 August.
- R-41251 — pale.harbour, form, 2026-04-25: Wednesday 7 January showed as Wednesday 1 July. I moved it myself.

## Reproduce / investigate

1. Use alder.physio (de-DE), copper.studio (es-ES), or pale.harbour (pt-PT).
2. Open booking-v3: the hint says MM/DD/YYYY.
3. Type 04/07/2026 to request 7 April following that hint.
4. Check whether tenant-local parsing instead reads 4 July.

Reproduction is inferred from the exported form and classification code; no live product was supplied.

## Acceptance

Make the displayed hint and parser agree with the tenant locale. Verify all three affected tenants. Test ambiguous and unambiguous input and an unaffected booking-v2 form. Do not call the shared parser fix sufficient.

## Report IDs

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

Source: exported `src/lib/data/reports-4471.json`, deduplicated by report ID. Intake tags and browser locale do not determine cause. See `evidence/analysis.json` and the signed KB decision.
