import { Column } from 'ag-grid-community';
import { ColumnNode } from '../settings/columns/types';
import { ColumnGroup } from '../types';
import { generateId } from './generateId';

export function buildColumnTree(
  columns: Column[], 
  columnGroups: ColumnGroup[] = []
): ColumnNode[] {
  const tree: ColumnNode[] = [];
  const columnMap = new Map<string, ColumnNode>();

  // First pass: Create nodes for all columns
  columns.forEach(column => {
    const colDef = column.getColDef();
    const node: ColumnNode = {
      id: column.getId() || generateId(),
      field: column.getColId(),
      headerName: colDef.headerName || column.getColId(),
      isGroup: false,
      isExpanded: true,
      hide: !column.isVisible(),
      width: column.getActualWidth(),
      sortable: colDef.sortable,
      filter: colDef.filter,
      headerClass: colDef.headerClass,
      cellClass: colDef.cellClass,
      headerStyle: colDef.headerStyle,
      cellStyle: colDef.cellStyle,
      valueFormatter: colDef.valueFormatter,
      cellRenderer: colDef.cellRenderer,
      editable: colDef.editable,
    };

    columnMap.set(column.getColId(), node);
  });

  // Second pass: Build group hierarchy based on columnGroups
  columnGroups.forEach(group => {
    const groupNode: ColumnNode = {
      id: group.id,
      headerName: group.name,
      isGroup: true,
      isExpanded: true,
      children: group.columns
        .map(colId => columnMap.get(colId))
        .filter((node): node is ColumnNode => !!node)
    };

    // Remove child columns from root level
    group.columns.forEach(colId => {
      const node = columnMap.get(colId);
      if (node) {
        node.parent = groupNode;
      }
    });

    tree.push(groupNode);
  });

  // Add remaining ungrouped columns to root level
  columnMap.forEach(node => {
    if (!node.parent) {
      tree.push(node);
    }
  });

  return tree;
}