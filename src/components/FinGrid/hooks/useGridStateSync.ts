import { useCallback, useRef, useEffect } from 'react';
import { GridApi } from 'ag-grid-community';
import { GeneralSettings } from '../types/settings';
import { GridState } from '../types/gridState';
import { syncGridState } from '../utils/gridStateSync';
import { logger } from '../utils/logger';
import { deepEqual } from '../utils/compare';

export function useGridStateSync(gridApi: GridApi | null) {
  const previousState = useRef<GridState | null>(null);
  const previousSettings = useRef<GeneralSettings | null>(null);
  const isInitialized = useRef(false);

  const getCurrentState = useCallback((): GridState | null => {
    if (!gridApi) {
      logger.warn('Grid API not available');
      return null;
    }

    try {
      const state: GridState = {
        columnState: gridApi.getColumnState(),
        columnGroupState: gridApi.getColumnGroupState(),
        filterModel: gridApi.getFilterModel(),
        rowGroupColumns: gridApi.getRowGroupColumns(),
        pivotColumns: gridApi.getPivotColumns()
      };
      return state;
    } catch (error) {
      logger.error('Failed to get current grid state', error);
      return null;
    }
  }, [gridApi]);

  // Initialize state tracking
  useEffect(() => {
    if (gridApi && !isInitialized.current) {
      const initialState = getCurrentState();
      if (initialState) {
        previousState.current = initialState;
        isInitialized.current = true;
      }
    }
  }, [gridApi, getCurrentState]);

  const syncState = useCallback(async (settings: GeneralSettings) => {
    if (!gridApi) return;

    try {
      const currentState = getCurrentState();
      if (!currentState) return;

      // Only sync if state or settings have changed
      if (
        previousState.current &&
        previousSettings.current &&
        deepEqual(currentState, previousState.current) && 
        deepEqual(settings, previousSettings.current)
      ) {
        return;
      }

      await syncGridState(gridApi, settings, currentState);

      // Update refs after successful sync
      previousState.current = currentState;
      previousSettings.current = settings;

    } catch (error) {
      logger.error('Failed to sync grid state', error);
    }
  }, [gridApi, getCurrentState]);

  return { syncState };
}