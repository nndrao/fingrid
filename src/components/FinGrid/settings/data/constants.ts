import { DataSourceFormData } from '../../types/dataSource';

export const DEFAULT_DATA_SOURCE: DataSourceFormData = {
  sourceType: 'Socket.IO (Websockets)',
  socketUrl: 'localhost:3001',
  dataFetchTopic: 'USTSY/SNAPSHOT',
  dataUpdateTopic: 'USTSY/UPDATES'
};