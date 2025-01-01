import { useState, useCallback } from 'react';
import { GridApi } from 'ag-grid-community';
import { GeneralSettings, DEFAULT_SETTINGS } from '../types/settings';
import { mapSettingsToGridOptions } from '../utils/gridConfigMapper';
import { logger } from '../utils/logger';

export function useGridSettings(
  gridApi: GridApi | null,
  initialSettings: Partial<GeneralSettings> = {}
) {
  const [settings, setSettings] = useState<GeneralSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...initialSettings
  }));

  const updateSettings = useCallback((updates: Partial<GeneralSettings>) => {
    setSettings(current => {
      const newSettings = { ...current, ...updates };
      
      if (gridApi) {
        try {
          const gridOptions = mapSettingsToGridOptions(newSettings);
          Object.entries(gridOptions).forEach(([key, value]) => {
            if (value !== undefined) {
              gridApi.setGridOption(key, value);
            }
          });
        } catch (error) {
          logger.error('Failed to apply grid settings:', error);
        }
      }
      
      return newSettings;
    });
  }, [gridApi]);

  return {
    settings,
    updateSettings
  };
}