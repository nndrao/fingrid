import React from 'react';
import { RowSelectionMode } from '../../../types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RowSelectionSettingsProps {
  enabled: boolean;
  mode: RowSelectionMode;
  onModeChange: (mode: RowSelectionMode) => void;
}

export const RowSelectionSettings: React.FC<RowSelectionSettingsProps> = ({
  enabled,
  mode,
  onModeChange,
}) => {
  if (!enabled) return null;

  return (
    <div className="space-y-3 pl-6 mt-2">
      <Label className="text-sm text-gray-500">Selection Mode</Label>
      <Select value={mode} onValueChange={(value) => onModeChange(value as RowSelectionMode)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single Row</SelectItem>
          <SelectItem value="multiple">Multiple Rows</SelectItem>
          <SelectItem value="none">Disabled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};