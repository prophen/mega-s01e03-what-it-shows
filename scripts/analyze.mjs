import fs from 'node:fs';
import { uniqueById, groupByCause, dayFirst } from '../src/lib/kb/causes.ts';
const data = new URL('../src/lib/data/', import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(name, data)));
const raw = read('reports-4471.json');
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const tenants = new Map(fs.readdirSync(new URL('tenants/', data)).map(f => {
  const t = read('tenants/' + f); return [t.handle, t];
}));
const notes = read('desk-notes.json').oneDayMove;
const groups = groupByCause(reports, r => tenants.get(r.tenant));
const weeks = Array.from({ length: 27 }, (_, i) => ({
  week: new Date(Date.parse('2026-03-30') + i * 604800000).toISOString().slice(0, 10),
  received: 0, merged: 0
}));
for (const r of reports) for (const [field, counter] of [['receivedAt', 'received'], ['mergedAt', 'merged']]) {
  const i = Math.floor((Date.parse(r[field].slice(0, 10)) - Date.parse('2026-03-30')) / 604800000);
  if (weeks[i]) weeks[i][counter]++;
}
const result = {
  rawRows: raw.length, uniqueReports: reports.length, overlappingRows: raw.length - reports.length,
  tenantDirectory: [...tenants.values()].map(t => ({ ...t, dayFirst: dayFirst(t.locale) })),
  groups: groups.map(g => ({ ...g, reports: g.reports.map(r => r.id) })),
  investigation: reports.filter(r => notes.includes(r.id)), weeks,
  intakeDisagreements: reports.filter(r => {
    const g = groups.find(g => g.reports.some(x => x.id === r.id)); return g.cause !== r.meta.intakeTag;
  }).map(r => r.id)
};
fs.mkdirSync(new URL('../evidence/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../evidence/analysis.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
if (reports.length !== 412 || groups.reduce((n, g) => n + g.reports.length, 0) !== 412) throw Error('Report reconciliation failed');
console.log(JSON.stringify({ rows: result.rawRows, unique: result.uniqueReports, groups: result.groups.map(g => [g.cause, g.reports.length]), intakeDisagreements: result.intakeDisagreements.length, investigation: notes.length, backlogWeek: weeks[13] }, null, 2));
