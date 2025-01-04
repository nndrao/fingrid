import { ColDef, ColGroupDef } from 'ag-grid-community';
import { ColumnGroup } from '../types/columnGroup';

export const generateColumnDefs = (
  baseColumnDefs: ColDef[],
  groups: ColumnGroup[],
  activeGroups: string[],
  expandedGroups: string[]
): (ColDef | ColGroupDef)[] => {
  // Create a map of all base columns for quick lookup
  const columnMap = new Map<string, ColDef>();
  baseColumnDefs.forEach(col => {
    if ('field' in col) {
      columnMap.set(col.field!, col);
    }
  });

  // Track used columns to prevent duplicates
  const usedColumns = new Set<string>();

  // Generate group definitions for active groups
  const groupDefs: (ColDef | ColGroupDef)[] = activeGroups
    .map(groupId => {
      const group = groups.find(g => g.id === groupId);
      if (!group) return null;

      // Get valid columns for this group (not already used in other groups)
      const validColumns = group.columns
        .filter(field => columnMap.has(field) && !usedColumns.has(field))
        .map(field => {
          usedColumns.add(field);
          return columnMap.get(field)!;
        });

      if (validColumns.length === 0) return null;

      return {
        headerName: group.name,
        groupId: group.id,
        marryChildren: true,
        children: validColumns,
        openByDefault: expandedGroups.includes(group.id),
        expanded: group.expanded
      } as ColGroupDef;
    })
    .filter((def): def is ColGroupDef => def !== null);

  // Add remaining ungrouped columns
  const remainingColumns = baseColumnDefs.filter(col => {
    if (!('field' in col)) return true;
    return !usedColumns.has(col.field!);
  });

  return [...remainingColumns, ...groupDefs];
}; 