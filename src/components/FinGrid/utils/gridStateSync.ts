import { GridApi } from 'ag-grid-community';
import { GeneralSettings } from '../types/settings';
import { GridState } from '../types/gridState';
import { mapSettingsToGridOptions } from './gridConfigMapper';
import { logger } from './logger';

export async function syncGridState(
  gridApi: GridApi,
  settings: GeneralSettings,
  currentState: GridState
): Promise<void> {
  if (!gridApi) {
    throw new Error('Grid API not initialized');
  }

  try {
    // 1. Apply grid options
    const gridOptions = mapSettingsToGridOptions(settings);
    Object.entries(gridOptions).forEach(([key, value]) => {
      if (value !== undefined) {
        try {
          gridApi.setGridOption(key, value);
        } catch (error) {
          logger.warn(`Failed to set grid option ${key}:`, error);
        }
      }
    });

    // 2. Apply status bar settings
    if (settings.showStatusBar) {
      const statusPanels = settings.statusBarComponents
        .filter(comp => comp.enabled)
        .map(comp => ({
          statusPanel: `ag${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}RowCountComponent`
        }));
      
      gridApi.setGridOption('statusBar', { statusPanels });
    } else {
      gridApi.setGridOption('statusBar', null);
    }

    // 3. Apply column state
    if (currentState.columnState?.length) {
      gridApi.applyColumnState({
        state: currentState.columnState,
        applyOrder: true
      });
    }

    // 4. Size columns appropriately
    if (settings.enableAutoSizeColumns) {
      gridApi.autoSizeAllColumns();
    } else {
      gridApi.sizeColumnsToFit();
    }

    logger.info('Grid state synchronized successfully');

  } catch (error) {
    logger.error('Error synchronizing grid state:', error);
    throw error;
  }
}