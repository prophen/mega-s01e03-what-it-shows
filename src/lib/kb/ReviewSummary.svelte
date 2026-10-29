<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const merged = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  const flagged = merged.filter(r => notes.oneDayMove.includes(r.id));
  const groups = groupByCause(merged, tenantOf);
</script>

<p>{reports.length} export rows − {reports.length - merged.length} overlapping rows = <strong>{merged.length} unique reports</strong>. Every report has one primary ticket in this review.</p>
<table>
  <thead><tr><th>Primary ticket</th><th>Reports</th><th>Basis</th></tr></thead>
  <tbody>
    {#each groups as group}
      <tr><td>{group.cause === 'parser' ? 'Shared month-first parser' : 'booking-v3 form hint'}</td><td>{group.reports.length}</td><td>{group.tenants} tenants · {group.firstSeen} → {group.lastSeen}</td></tr>
    {/each}
  </tbody>
</table>
<p>The exported classifier assigns {merged.length - groups.find(g => g.cause === 'hint')!.reports.length} reports to parser and {groups.find(g => g.cause === 'hint')!.reports.length} to hint. The {flagged.length} flagged reports remain counted under parser by tenant. They are investigation notes within that ticket, not evidence of an independent root cause.</p>
<table>
  <thead><tr><th>Flagged report</th><th>Tenant / channel</th><th>What the reporter says</th></tr></thead>
  <tbody>{#each flagged as report}<tr><td>{report.id}</td><td>{report.tenant} / {report.channel}</td><td>{report.body}</td></tr>{/each}</tbody>
</table>
