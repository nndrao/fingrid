import { useEffect, useMemo } from 'react';
import { ColDef, GridApi } from 'ag-grid-community';
import { useColumnGroups } from '../context/ColumnGroupsContext';
import { generateColumnDefs } from '../utils/columnGroupUtils';

export function useColumnGrouping(
  baseColumnDefs: ColDef[],
  gridApi: GridApi | null = null
) {
  const {
    state: { groups, activeGroups, expandedGroups },
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroupActive,
    toggleGroupExpanded,
  } = useColumnGroups();

  // Generate column definitions based on current state
  const columnDefs = useMemo(() => {
    try {
      // Ensure baseColumnDefs is a valid array of ColDef
      if (!Array.isArray(baseColumnDefs)) {
        console.warn('baseColumnDefs must be an array:', baseColumnDefs);
        return [];
      }

      // Create a deep copy of baseColumnDefs to prevent mutations
      const baseDefs = baseColumnDefs.map(def => ({ ...def }));

      const defs = generateColumnDefs(
        baseDefs,
        groups || [],
        activeGroups || [],
        expandedGroups || []
      );

      return Array.isArray(defs) ? defs : [];
    } catch (error) {
      console.error('Error generating column definitions:', error);
      return baseColumnDefs;
    }
  }, [baseColumnDefs, groups, activeGroups, expandedGroups]);

  // Update grid columns when definitions change
  useEffect(() => {
    if (!gridApi || !columnDefs.length) return;

    try {
      // Update grid options using the recommended method
      gridApi.setGridOption('columnDefs', columnDefs);

      // Ensure columns are fitted properly
      requestAnimationFrame(() => {
        if (gridApi && !gridApi.isDestroyed()) {
          gridApi.sizeColumnsToFit();
        }
      });
    } catch (error) {
      console.error('Error updating grid columns:', error);
    }
  }, [gridApi, columnDefs]);

  // Get available columns (not in any active group)
  const availableColumns = useMemo(() => {
    try {
      if (!Array.isArray(baseColumnDefs)) {
        return [];
      }

      const usedColumns = new Set<string>();
      
      // Collect all columns used in active groups
      if (Array.isArray(activeGroups) && Array.isArray(groups)) {
        activeGroups.forEach(groupId => {
          const group = groups.find(g => g.id === groupId);
          if (group && Array.isArray(group.columns)) {
            group.columns.forEach(col => usedColumns.add(col));
          }
        });
      }

      // Return columns that aren't used in any active group
      return baseColumnDefs
        .filter(col => col && typeof col === 'object' && 'field' in col && !usedColumns.has(col.field!))
        .map(col => 'field' in col ? col.field! : '')
        .filter(Boolean);
    } catch (error) {
      console.error('Error calculating available columns:', error);
      return [];
    }
  }, [baseColumnDefs, groups, activeGroups]);

  return {
    columnDefs,
    availableColumns,
    groups: groups || [],
    activeGroups: activeGroups || [],
    expandedGroups: expandedGroups || [],
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroupActive,
    toggleGroupExpanded,
  };
} 