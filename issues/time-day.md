SUPERSEDED: these five reports are included in parser issue #1 (379 total). This investigation is closed as duplicate after the course desk confirmed it is the same problem. Notes remain in the parser issue and signed KB page.

# Investigate time/day anomalies merged into parser ticket — 5 reports

## Scope

5 unique reports from source ticket #4471. These five are explicitly flagged in desk-notes.json. The code files them under parser by tenant, but their bodies do not demonstrate a month/day transposition. A timezone or date-only conversion issue is a hypothesis, not a confirmed cause. R-41236 only says an invite arrived before booking; establish its timestamps before asserting a one-day shift.

## Evidence

- R-41202 — kettle.books, email, 2026-04-02: Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.
- R-41209 — alder.physio, app, 2026-04-06: Every booking in June is one day off. Only June. Why only June.
- R-41236 — nine.lanterns, app, 2026-04-20: The invite arrived before I made the booking. I would like to know how.

## Reproduce / investigate

Obtain original input, event and invite timestamps, timezone IDs, UTC offsets, calendar date and delivery logs for R-41202, R-41209, R-41236, R-41344 and R-41620. Compare Lisbon/Toronto views for R-41344; inspect June-only behavior for R-41209. Trace date-only conversions and DST boundaries. Keep these reports separate until their causes can be demonstrated.

## Acceptance

Explain each report with timestamp evidence. Confirm or reject timezone/date conversion as a common cause; split further if necessary. Test the confirmed failure and verify it does not regress month/day parsing. Do not close these five merely because the parser or hint was fixed.

## Report IDs

R-41202, R-41209, R-41236, R-41344, R-41620

Source: exported `src/lib/data/reports-4471.json`, deduplicated by report ID. Intake tags and browser locale do not determine cause. See `evidence/analysis.json` and the signed KB decision.
