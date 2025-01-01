import { GridApi, ColumnApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { ColumnGroup } from '../types';
import { logger } from './logger';

function createColumnGroupDef(group: ColumnGroup, columnDefs: ColDef[]): ColGroupDef {
  const childColumns = columnDefs.filter(col => 
    group.columns.includes(col.field || '')
  );

  return {
    headerName: group.name,
    groupId: group.id,
    children: childColumns,
    marryChildren: true,
    openByDefault: true
  };
}

function applyColumnGroups(
  columnDefs: ColDef[],
  groups: ColumnGroup[]
): (ColDef | ColGroupDef)[] {
  // Create a map of all columns for quick lookup
  const columnMap = new Map(
    columnDefs.map(col => [col.field, col])
  );

  // Track which columns are already in groups
  const groupedColumns = new Set(
    groups.flatMap(group => group.columns)
  );

  // Create group definitions
  const groupDefs = groups.map(group => 
    createColumnGroupDef(group, group.columns.map(field => 
      columnMap.get(field)!
    ).filter(Boolean))
  );

  // Get ungrouped columns
  const ungroupedColumns = columnDefs.filter(col => 
    !groupedColumns.has(col.field || '')
  );

  return [...groupDefs, ...ungroupedColumns];
}

export async function syncColumnGroups(
  gridApi: GridApi,
  columnApi: ColumnApi,
  columnDefs: ColDef[],
  groups: ColumnGroup[]
): Promise<void> {
  try {
    // Get current column state
    const currentState = columnApi.getColumnState();
    
    // Apply new column definitions with groups
    const newColumnDefs = applyColumnGroups(columnDefs, groups);
    gridApi.setColumnDefs(newColumnDefs);
    
    // Restore previous column state
    columnApi.applyColumnState({
      state: currentState,
      applyOrder: true
    });
    
    // Ensure columns are properly sized
    gridApi.sizeColumnsToFit();

    logger.info('Column groups synchronized successfully');
  } catch (error) {
    logger.error('Error syncing column groups:', error);
    throw error;
  }
}