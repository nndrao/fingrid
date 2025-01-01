import { GridApi } from 'ag-grid-community';
import { GridSettings } from '../types/gridSettings';
import { validateSettings } from './settingsValidator';

export async function applyGridSettings(
  gridApi: GridApi,
  settings: Partial<GridSettings>
): Promise<boolean> {
  try {
    // Validate settings before applying
    const validation = validateSettings(settings);
    if (!validation.isValid) {
      console.error('Invalid grid settings:', validation.errors);
      return false;
    }

    // Apply column settings
    if (settings.columns) {
      const defaultColDef = {
        width: settings.columns.defaultWidth,
        resizable: settings.columns.resizable,
        sortable: settings.columns.sortable,
        filter: settings.columns.filterable,
      };
      gridApi.setGridOption('defaultColDef', defaultColDef);
    }

    // Apply row settings
    if (settings.rows) {
      gridApi.setGridOption('rowHeight', settings.rows.height);
      gridApi.setGridOption('headerHeight', settings.rows.headerHeight);
      gridApi.setGridOption('showRowNumbers', settings.rows.numbering);
    }

    // Apply pagination settings
    if (settings.pagination) {
      gridApi.setGridOption('pagination', settings.pagination.enabled);
      gridApi.setGridOption('paginationPageSize', settings.pagination.pageSize);
    }

    // Apply selection settings
    if (settings.selection) {
      gridApi.setGridOption('rowSelection', 
        settings.selection.enabled ? settings.selection.mode : undefined
      );
    }

    // Apply feature settings
    if (settings.features) {
      // Sorting
      if (settings.features.sorting) {
        gridApi.setGridOption('sortingEnabled', settings.features.sorting.enabled);
        gridApi.setGridOption('multiSortKey', 'ctrl');
      }

      // Filtering
      if (settings.features.filtering) {
        gridApi.setGridOption('filteringEnabled', settings.features.filtering.enabled);
      }
    }

    // Apply sidebar settings
    if (settings.sidebar) {
      gridApi.setSideBar({
        position: settings.sidebar.position,
        defaultWidth: settings.sidebar.width,
        hiddenByDefault: !settings.sidebar.expanded,
        toolPanels: [
          {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
          },
          {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
          }
        ]
      });
    }

    // Force grid refresh
    gridApi.refreshHeader();
    gridApi.redrawRows();

    return true;
  } catch (error) {
    console.error('Failed to apply grid settings:', error);
    return false;
  }
}