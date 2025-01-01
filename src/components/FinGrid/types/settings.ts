import { DataSourceFormData, DEFAULT_DATA_SOURCE } from './dataSource';

export interface GeneralSettings {
  // Grid Appearance
  theme: string;
  headerHeight: number;
  rowHeight: number;
  defaultColumnWidth: number;
  title?: string;

  // Grid Behavior
  enableSorting: boolean;
  enableFiltering: boolean;
  enableColumnResize: boolean;
  enableAutoSizeColumns: boolean;
  enableRowSelection: boolean;
  rowSelectionMode: 'single' | 'multiple' | 'none';

  // Layout
  showTopToolbar: boolean;
  showBottomToolbar: boolean;
  showRowNumbers: boolean;
  enablePagination: boolean;
  rowsPerPage: number;

  // Status Bar
  statusBar: {
    show: boolean;
    position: 'top' | 'bottom';
    components: Array<{
      id: string;
      name: string;
      enabled: boolean;
    }>;
  };

  // Data Source
  dataSource: DataSourceFormData;
}

export const DEFAULT_SETTINGS: GeneralSettings = {
  theme: 'alpine',
  headerHeight: 45,
  rowHeight: 40,
  defaultColumnWidth: 150,
  
  enableSorting: true,
  enableFiltering: true,
  enableColumnResize: true,
  enableAutoSizeColumns: true,
  enableRowSelection: true,
  rowSelectionMode: 'multiple',

  showTopToolbar: true,
  showBottomToolbar: true,
  showRowNumbers: true,
  enablePagination: true,
  rowsPerPage: 25,

  statusBar: {
    show: true,
    position: 'bottom',
    components: [
      { id: 'rowCount', name: 'Row Count', enabled: true },
      { id: 'selectedCount', name: 'Selected Count', enabled: true },
      { id: 'filteredCount', name: 'Filtered Count', enabled: true }
    ]
  },

  dataSource: DEFAULT_DATA_SOURCE
};