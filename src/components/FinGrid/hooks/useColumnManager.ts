import { useCallback, useEffect, useState } from 'react';
import { GridApi, ColumnApi, Column } from 'ag-grid-community';

export function useColumnManager(gridApi: GridApi | null, columnApi: ColumnApi | null) {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (gridApi) {
      // Use gridApi.getAllGridColumns() instead of columnApi.getAllGridColumns()
      const allColumns = gridApi.getAllGridColumns();
      setColumns(allColumns);
    }
  }, [gridApi]);

  const getVisibleColumns = useCallback(() => {
    if (!columnApi) return [];
    return columnApi.getAllDisplayedColumns();
  }, [columnApi]);

  const setColumnsVisible = useCallback((colIds: string[], visible: boolean) => {
    if (!columnApi) return;
    columnApi.setColumnsVisible(colIds, visible);
  }, [columnApi]);

  const moveColumn = useCallback((colId: string, toIndex: number) => {
    if (!columnApi) return;
    columnApi.moveColumn(colId, toIndex);
  }, [columnApi]);

  const moveColumns = useCallback((colIds: string[], toIndex: number) => {
    if (!columnApi) return;
    columnApi.moveColumns(colIds, toIndex);
  }, [columnApi]);

  return {
    columns,
    getVisibleColumns,
    setColumnsVisible,
    moveColumn,
    moveColumns
  };
} 