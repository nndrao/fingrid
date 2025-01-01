import { GridApi, ColumnApi } from 'ag-grid-community';
import { ColumnUpdate } from '../settings/columns/types';

export function applyColumnUpdate(
  update: ColumnUpdate,
  gridApi: GridApi,
  columnApi: ColumnApi
) {
  const column = columnApi.getColumn(update.id);
  if (!column) return;

  const colDef = column.getColDef();
  const newColDef = { ...colDef };

  // Apply changes to the column definition
  Object.entries(update.changes).forEach(([key, value]) => {
    if (key === 'headerName') {
      newColDef.headerName = value;
    } else if (key === 'width') {
      column.setActualWidth(value as number);
    } else if (key === 'hide') {
      column.setVisible(!(value as boolean));
    } else if (key === 'headerStyle' || key === 'cellStyle') {
      newColDef[key] = { ...(colDef[key] || {}), ...value };
    } else {
      newColDef[key] = value;
    }
  });

  // Get all current column definitions
  const allColDefs = columnApi.getColumns()?.map(col => col.getColDef()) || [];
  
  // Create updated column definitions array
  const updatedColDefs = allColDefs.map(def => 
    def.field === colDef.field ? newColDef : def
  );

  // Use gridApi to set the new column definitions
  gridApi.setColumnDefs(updatedColDefs);
  
  // Refresh the grid
  gridApi.refreshHeader();
  gridApi.refreshCells();
}