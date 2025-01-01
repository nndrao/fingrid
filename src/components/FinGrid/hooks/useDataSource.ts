import { useState, useCallback } from 'react';
import { ColDef } from 'ag-grid-community';
import { DataSourceFormData } from '../types';
import { generateColumnDefs } from '../utils/gridSchemaUtils';
import { logger } from '../utils/logger';

interface UseDataSourceResult {
  connect: (config: DataSourceFormData) => Promise<{
    data: any[];
    columnDefs: ColDef[];
  }>;
  disconnect: () => void;
  data: any[];
  columnDefs: ColDef[];
  isConnected: boolean;
  error: string | null;
}

export function useDataSource(): UseDataSourceResult {
  const [data, setData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiConnection = async (config: DataSourceFormData) => {
    try {
      if (!config.apiEndpoint) {
        throw new Error('API endpoint is required');
      }

      const response = await fetch(config.apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      
      // Handle different API response formats
      let processedData: any[] = [];
      
      if (Array.isArray(jsonData)) {
        processedData = jsonData;
      } else if (typeof jsonData === 'object') {
        // Check common response wrapper properties
        const possibleArrays = [
          jsonData.todos,
          jsonData.data,
          jsonData.items,
          jsonData.results,
          Object.values(jsonData)
        ];

        for (const arr of possibleArrays) {
          if (Array.isArray(arr) && arr.length > 0) {
            processedData = arr;
            break;
          }
        }
      }

      if (processedData.length === 0) {
        throw new Error('API returned empty data set');
      }

      // Generate column definitions
      const newColumnDefs = generateColumnDefs(processedData);
      
      setData(processedData);
      setColumnDefs(newColumnDefs);
      setIsConnected(true);
      setError(null);

      return { data: processedData, columnDefs: newColumnDefs };
    } catch (err) {
      const error = err as Error;
      const errorMessage = `API connection error: ${error.message}`;
      setError(errorMessage);
      setIsConnected(false);
      throw new Error(errorMessage);
    }
  };

  const connect = useCallback(async (config: DataSourceFormData) => {
    try {
      disconnect();
      return await handleApiConnection(config);
    } catch (err) {
      const error = err as Error;
      logger.error('Data source connection error:', error);
      throw error;
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setError(null);
    setData([]);
    setColumnDefs([]);
  }, []);

  return {
    connect,
    disconnect,
    data,
    columnDefs,
    isConnected,
    error
  };
}