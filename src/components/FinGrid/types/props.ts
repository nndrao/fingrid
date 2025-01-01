import { GridOptions } from 'ag-grid-community';
import { GeneralSettings } from './settings';

export interface FinGridProps {
  title?: string;
  showTopToolbar?: boolean;
  showBottomToolbar?: boolean;
  topToolbarContent?: React.ReactNode;
  bottomToolbarContent?: React.ReactNode;
  onSettingsClick?: () => void;
  columnDefs: any[];
  rowData: any[];
  gridOptions?: Partial<GridOptions>;
  initialSettings?: Partial<GeneralSettings>;
}