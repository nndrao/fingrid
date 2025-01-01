import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ApiEndpointFormProps {
  endpoint: string;
  onChange: (endpoint: string) => void;
  onConnect: () => void;
}

export const ApiEndpointForm: React.FC<ApiEndpointFormProps> = ({
  endpoint,
  onChange,
  onConnect,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>API Endpoint</Label>
        <Input
          value={endpoint}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://jsonplaceholder.typicode.com/users"
        />
        <p className="text-sm text-gray-500">
          Enter the URL of your API endpoint that returns JSON array data
        </p>
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