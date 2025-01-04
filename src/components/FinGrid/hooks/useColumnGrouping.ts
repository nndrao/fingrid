import { useMemo, useCallback, useEffect, useRef } from 'react';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { useColumnGroups } from '../context/ColumnGroupsContext';
import { generateColumnDefs } from '../utils/columnGroupUtils';

export function useColumnGrouping(baseColumnDefs: ColDef[], gridApi?: GridApi | null) {
  const {
    state: { groups, activeGroups, expandedGroups },
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroupActive,
    toggleGroupExpanded
  } = useColumnGroups();

  const previousGroupsRef = useRef<string[]>([]);

  // Generate column definitions including groups
  const columnDefs = useMemo(() => 
    generateColumnDefs(baseColumnDefs, groups, activeGroups, expandedGroups),
    [baseColumnDefs, groups, activeGroups, expandedGroups]
  );

  // Reset and reapply column groups when they change
  useEffect(() => {
    if (!gridApi) return;

    const currentGroupIds = groups.map(g => g.id).sort().join(',');
    const previousGroupIds = previousGroupsRef.current.sort().join(',');

    if (currentGroupIds !== previousGroupIds) {
      // Reset all column groups
      const flatColumnDefs = baseColumnDefs.map(colDef => ({
        ...colDef,
        groupId: undefined,
        children: undefined
      }));
      
      // Apply flat structure first
      gridApi.setColumnDefs(flatColumnDefs);
      
      // Then apply the new group structure
      setTimeout(() => {
        gridApi.setColumnDefs(columnDefs);
      }, 0);

      previousGroupsRef.current = groups.map(g => g.id);
    } else {
      // Just update the column definitions normally
      gridApi.setColumnDefs(columnDefs);
    }
  }, [gridApi, columnDefs, groups, baseColumnDefs]);

  // Get available columns (not in any active group)
  const availableColumns = useMemo(() => {
    const groupedColumns = new Set<string>();
    groups
      .filter(group => activeGroups.includes(group.id))
      .forEach(group => {
        group.columns.forEach(col => groupedColumns.add(col));
      });

    return baseColumnDefs
      .filter((colDef): colDef is ColDef & { field: string } => 
        'field' in colDef && !!colDef.field && !groupedColumns.has(colDef.field)
      )
      .map(colDef => colDef.field);
  }, [baseColumnDefs, groups, activeGroups]);

  // Get all column fields
  const allColumns = useMemo(() => 
    baseColumnDefs
      .filter((colDef): colDef is ColDef & { field: string } => 
        'field' in colDef && !!colDef.field
      )
      .map(colDef => colDef.field),
    [baseColumnDefs]
  );

  return {
    columnDefs,
    groups,
    activeGroups,
    expandedGroups,
    availableColumns,
    allColumns,
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroupActive,
    toggleGroupExpanded
  };
} 