import React from 'react';
import { Button } from '@/components/ui/button';
import { DataSourceSettings, DataSourceType } from '../types';

interface DataSourceSectionProps {
  settings: DataSourceSettings;
  onSettingsChange: (settings: DataSourceSettings) => void;
}

export const DataSourceSection: React.FC<DataSourceSectionProps> = ({
  settings,
  onSettingsChange,
}) => {
  const sourceTypes: DataSourceType[] = ['API Endpoint', 'Socket.IO (Websockets)'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Data Source</h2>
        <p className="text-sm text-gray-500">Configure how data is loaded into the grid</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Source Type</label>
          <select
            value={settings.sourceType}
            onChange={(e) => onSettingsChange({ ...settings, sourceType: e.target.value as DataSourceType })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {sourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {settings.sourceType === 'API Endpoint' ? (
          <div>
            <label className="block text-sm font-medium mb-1">API Endpoint</label>
            <input
              type="text"
              value={settings.apiEndpoint || ''}
              onChange={(e) => onSettingsChange({ ...settings, apiEndpoint: e.target.value })}
              placeholder="https://api.example.com/data"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the URL of your API endpoint that returns JSON array data
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Socket URL</label>
              <input
                type="text"
                value={settings.socketUrl || ''}
                onChange={(e) => onSettingsChange({ ...settings, socketUrl: e.target.value })}
                placeholder="localhost:3001"
                className="w-full rounded-md border border-gray-300 p-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the host and port (e.g., localhost:3001)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data Fetch Topic</label>
              <input
                type="text"
                value={settings.dataFetchTopic || ''}
                onChange={(e) => onSettingsChange({ ...settings, dataFetchTopic: e.target.value })}
                placeholder="USTSY/SNAPSHOT"
                className="w-full rounded-md border border-gray-300 p-2"
              />
              <p className="text-sm text-gray-500 mt-1">Topic for initial data fetch</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data Update Topic</label>
              <input
                type="text"
                value={settings.dataUpdateTopic || ''}
                onChange={(e) => onSettingsChange({ ...settings, dataUpdateTopic: e.target.value })}
                placeholder="USTSY/UPDATES"
                className="w-full rounded-md border border-gray-300 p-2"
              />
              <p className="text-sm text-gray-500 mt-1">Topic for real-time updates</p>
            </div>
          </div>
        )}

        <Button className="w-full">Connect</Button>
      </div>
    </div>
  );
};