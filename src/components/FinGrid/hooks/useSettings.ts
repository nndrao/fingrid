import { useState, useCallback } from 'react';
import { GeneralSettings, DEFAULT_SETTINGS } from '../types';

export function useSettings(initialSettings: Partial<GeneralSettings> = {}) {
  const [settings, setSettings] = useState<GeneralSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings
  });

  const updateSettings = useCallback((updates: Partial<GeneralSettings>) => {
    setSettings(current => ({
      ...current,
      ...updates
    }));
  }, []);

  return {
    settings,
    updateSettings
  };
}