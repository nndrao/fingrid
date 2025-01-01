import { useCallback, useRef } from 'react';
import { GridApi } from 'ag-grid-community';
import { GeneralSettings } from '../types';

export const useGridSettingsSync = (gridApi: GridApi | null) => {
  const previousSettings = useRef<Partial<GeneralSettings>>({});

  const syncSettings = useCallback((newSettings: GeneralSettings) => {
    if (!gridApi) return;

    try {
      // Track which settings have changed
      const changes = Object.entries(newSettings).reduce((acc, [key, value]) => {
        if (previousSettings.current[key as keyof GeneralSettings] !== value) {
          acc[key as keyof GeneralSettings] = value;
        }
        return acc;
      }, {} as Partial<GeneralSettings>);

      // Update only changed settings
      if (changes.rowHeight) {
        gridApi.resetRowHeights();
      }

      if (changes.headerHeight) {
        gridApi.setHeaderHeight(changes.headerHeight);
        gridApi.refreshHeader();
      }

      if (changes.enableSorting || changes.enableFiltering || 
          changes.enableColumnResize || changes.defaultColumnWidth || 
          changes.enableFloatingFilter) {
        const defaultColDef = {
          sortable: newSettings.enableSorting,
          filter: newSettings.enableFiltering,
          resizable: newSettings.enableColumnResize,
          width: newSettings.defaultColumnWidth,
          floatingFilter: newSettings.enableFloatingFilter
        };
        gridApi.setGridOption('defaultColDef', defaultColDef);
      }

      if (changes.enablePagination || changes.rowsPerPage) {
        gridApi.setGridOption('pagination', newSettings.enablePagination);
        gridApi.setGridOption('paginationPageSize', newSettings.rowsPerPage);
        gridApi.paginationGoToPage(0); // Reset to first page
      }

      if (changes.enableRowSelection || changes.rowSelectionMode) {
        gridApi.setGridOption('rowSelection', 
          newSettings.enableRowSelection ? newSettings.rowSelectionMode : undefined
        );
      }

      if (changes.showStatusBar || changes.statusBarComponents) {
        const statusPanels = [];
        if (newSettings.showStatusBar) {
          newSettings.statusBarComponents.forEach(comp => {
            if (comp.enabled) {
              switch (comp.id) {
                case 'total':
                  statusPanels.push({ statusPanel: 'agTotalRowCountComponent' });
                  break;
                case 'filtered':
                  statusPanels.push({ statusPanel: 'agFilteredRowCountComponent' });
                  break;
                case 'selected':
                  statusPanels.push({ statusPanel: 'agSelectedRowCountComponent' });
                  break;
              }
            }
          });
        }
        gridApi.setGridOption('statusBar', { statusPanels });
      }

      if (changes.showSidebar || changes.sidebarPosition || 
          changes.sidebarWidth || changes.sidebarExpanded) {
        const sideBar = newSettings.showSidebar ? {
          position: newSettings.sidebarPosition,
          defaultWidth: newSettings.sidebarWidth,
          hiddenByDefault: !newSettings.sidebarExpanded,
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
        } : false;
        gridApi.setGridOption('sideBar', sideBar);
      }

      // Refresh the grid if needed
      if (Object.keys(changes).length > 0) {
        gridApi.sizeColumnsToFit();
      }

      // Update previous settings reference
      previousSettings.current = { ...newSettings };
    } catch (error) {
      console.error('Error syncing grid settings:', error);
      throw new Error('Failed to update grid settings');
    }
  }, [gridApi]);

  return { syncSettings };
};