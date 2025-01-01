import { DataSourceFormData, DEFAULT_DATA_SOURCE } from './types/dataSource';

export interface GeneralSettings {
  // ... existing properties ...
  
  // Data Source Settings
  dataSource: DataSourceFormData;
}

export const DEFAULT_SETTINGS: GeneralSettings = {
  // ... existing defaults ...
  
  // Data Source Settings
  dataSource: DEFAULT_DATA_SOURCE
};

export type { DataSourceFormData, DataSourceType } from './types/dataSource';