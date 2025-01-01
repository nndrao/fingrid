export type DataSourceType = 'API Endpoint' | 'Socket.IO (Websockets)';

export interface DataSourceFormData {
  sourceType: DataSourceType;
  apiEndpoint?: string;
  socketUrl?: string;
  dataFetchTopic?: string;
  dataUpdateTopic?: string;
}

export const DEFAULT_DATA_SOURCE: DataSourceFormData = {
  sourceType: 'API Endpoint',
  apiEndpoint: 'https://dummyjson.com/todos',
  socketUrl: 'localhost:3001',
  dataFetchTopic: 'USTSY/SNAPSHOT',
  dataUpdateTopic: 'USTSY/UPDATES'
};