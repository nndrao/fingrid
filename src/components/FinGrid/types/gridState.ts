import { ColumnState } from 'ag-grid-community';

export interface GridState {
  columnState: ColumnState[];
  columnGroupState: { groupId: string; open: boolean }[];
  filterModel: { [key: string]: any };
  rowGroupColumns: any[];
  pivotColumns: any[];
}