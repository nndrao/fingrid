import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApiEndpointForm } from './components/ApiEndpointForm';
import { SocketForm } from './components/SocketForm';
import { DataSourceFormData, DEFAULT_DATA_SOURCE } from '../../types/dataSource';

interface DataSectionProps {
  initialData?: DataSourceFormData;
  onSettingsChange: (data: DataSourceFormData) => void;
}

export const DataSection: React.FC<DataSectionProps> = ({
  initialData = DEFAULT_DATA_SOURCE,
  onSettingsChange,
}) => {
  const [formData, setFormData] = useState<DataSourceFormData>(initialData);
  const sourceTypes: Array<'API Endpoint' | 'Socket.IO (Websockets)'> = ['API Endpoint', 'Socket.IO (Websockets)'];

  const handleConnect = () => {
    onSettingsChange(formData);
  };

  const handleSocketFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80">
        <h2 className="text-lg font-semibold">Data Source</h2>
        <p className="text-sm text-gray-500">Configure how data is loaded into the grid</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Type</label>
          <Select
            value={formData.sourceType}
            onValueChange={(value: 'API Endpoint' | 'Socket.IO (Websockets)') => 
              setFormData({ ...formData, sourceType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sourceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.sourceType === 'API Endpoint' ? (
          <ApiEndpointForm
            endpoint={formData.apiEndpoint || ''}
            onChange={(value) => handleSocketFieldChange('apiEndpoint', value)}
            onConnect={handleConnect}
          />
        ) : (
          <SocketForm
            socketUrl={formData.socketUrl || ''}
            dataFetchTopic={formData.dataFetchTopic || ''}
            dataUpdateTopic={formData.dataUpdateTopic || ''}
            onChange={handleSocketFieldChange}
            onConnect={handleConnect}
          />
        )}
      </div>
    </div>
  );
};