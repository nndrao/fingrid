export type DataSourceType = 'API Endpoint' | 'Socket.IO (Websockets)';

export interface DataSourceFormData {
  sourceType: DataSourceType;
  apiEndpoint?: string;
  socketUrl?: string;
  dataFetchTopic?: string;
  dataUpdateTopic?: string;
}