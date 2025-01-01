import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SocketFormProps {
  socketUrl: string;
  dataFetchTopic: string;
  dataUpdateTopic: string;
  onChange: (field: string, value: string) => void;
  onConnect: () => void;
}

export const SocketForm: React.FC<SocketFormProps> = ({
  socketUrl,
  dataFetchTopic,
  dataUpdateTopic,
  onChange,
  onConnect,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Socket URL</Label>
        <Input
          value={socketUrl}
          onChange={(e) => onChange('socketUrl', e.target.value)}
          placeholder="localhost:3001"
        />
        <p className="text-sm text-gray-500">
          Enter the host and port (e.g., localhost:3001)
        </p>
      </div>

      <div className="space-y-2">
        <Label>Data Fetch Topic</Label>
        <Input
          value={dataFetchTopic}
          onChange={(e) => onChange('dataFetchTopic', e.target.value)}
          placeholder="USTSY/SNAPSHOT"
        />
        <p className="text-sm text-gray-500">Topic for initial data fetch</p>
      </div>

      <div className="space-y-2">
        <Label>Data Update Topic</Label>
        <Input
          value={dataUpdateTopic}
          onChange={(e) => onChange('dataUpdateTopic', e.target.value)}
          placeholder="USTSY/UPDATES"
        />
        <p className="text-sm text-gray-500">Topic for real-time updates</p>
      </div>

      <Button 
        className="w-full"
        onClick={onConnect}
      >
        Connect
      </Button>
    </div>
  );
};