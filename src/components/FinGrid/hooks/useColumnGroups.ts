import { useCallback, useEffect, useRef } from 'react';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { ColumnGroup } from '../types';
import { syncColumnGroups } from '../utils/columnGroups';
import { logger } from '../utils/logger';

export function useColumnGroups(
  gridApi: GridApi | null,
  columnApi: ColumnApi | null,
  settings: any,
  columnDefs: any[]
) {
  const previousGroups = useRef<ColumnGroup[]>([]);

  const handleGroupsChange = useCallback(async (groups: ColumnGroup[]) => {
    if (!gridApi || !columnApi) {
      logger.warn('Grid APIs not available');
      return;
    }

    try {
      await syncColumnGroups(gridApi, columnApi, columnDefs, groups);
      previousGroups.current = groups;
      logger.info('Column groups synchronized successfully');
    } catch (error) {
      logger.error('Failed to sync column groups:', error);
      // Attempt to restore previous state
      if (previousGroups.current.length > 0) {
        try {
          await syncColumnGroups(gridApi, columnApi, columnDefs, previousGroups.current);
          logger.info('Successfully restored previous column groups');
        } catch (restoreError) {
          logger.error('Failed to restore column groups:', restoreError);
        }
      }
    }
  }, [gridApi, columnApi, columnDefs]);

  // Only sync groups when APIs are available and groups change
  useEffect(() => {
    if (gridApi && columnApi && settings?.columnGroups) {
      handleGroupsChange(settings.columnGroups);
    }
  }, [gridApi, columnApi, settings?.columnGroups, handleGroupsChange]);

  return { handleGroupsChange };
}