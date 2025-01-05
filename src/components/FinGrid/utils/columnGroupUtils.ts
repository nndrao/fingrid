import { ColDef } from 'ag-grid-community';
import { ColumnGroup } from '../types/columnGroup';

export const generateColumnDefs = (
  baseColumnDefs: ColDef[],
  groups: ColumnGroup[],
  activeGroups: string[],
  expandedGroups: string[]
): ColDef[] => {
  if (!baseColumnDefs || !Array.isArray(baseColumnDefs)) {
    return [];
  }

  // Create a map of all base columns for quick lookup
  const columnMap = new Map<string, ColDef>();
  baseColumnDefs.forEach(col => {
    if (col.field) {
      columnMap.set(col.field, { ...col }); // Clone the column definition
    }
  });

  // Track which columns are used in active groups
  const usedColumns = new Set<string>();

  // Generate group definitions for active groups
  const groupDefs: ColDef[] = [];

  // Process active groups first
  activeGroups.forEach(groupId => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    // Get valid columns for this group
    const validColumns = group.columns
      .filter(colField => columnMap.has(colField))
      .map(colField => {
        const col = columnMap.get(colField)!;
        usedColumns.add(colField); // Mark column as used
        return { ...col }; // Clone to prevent reference issues
      });

    if (validColumns.length === 0) return;

    // Create group definition
    groupDefs.push({
      headerName: group.name,
      groupId: group.id,
      children: validColumns,
      marryChildren: true,
      openByDefault: expandedGroups.includes(group.id)
    });
  });

  // Only include columns that aren't in any active group
  const remainingColumns = baseColumnDefs
    .filter(col => col.field && !usedColumns.has(col.field))
    .map(col => ({ ...col })); // Clone to prevent reference issues

  // Return grouped columns first, then ungrouped columns
  return [...groupDefs, ...remainingColumns];
}; 