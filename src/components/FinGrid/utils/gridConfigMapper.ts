import { GridOptions } from 'ag-grid-community';
import { GeneralSettings } from '../types';

export function mapSettingsToGridOptions(settings: GeneralSettings): GridOptions {
  return {
    // Core Features
    pagination: settings.enablePagination,
    paginationPageSize: settings.rowsPerPage,
    rowSelection: settings.enableRowSelection ? settings.rowSelectionMode : undefined,
    
    // Dimensions
    headerHeight: settings.headerHeight,
    rowHeight: settings.rowHeight,
    
    // Default Column Behavior
    defaultColDef: {
      sortable: settings.enableSorting,
      filter: settings.enableFiltering,
      resizable: settings.enableColumnResize,
      width: settings.defaultColumnWidth,
      floatingFilter: settings.enableFloatingFilter,
    },

    // Status Bar
    statusBar: settings.statusBar.show ? {
      statusPanels: settings.statusBar.components
        .filter(comp => comp.enabled)
        .map(comp => ({
          statusPanel: `ag${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}RowCountComponent`,
        }))
    } : undefined,
  };
}