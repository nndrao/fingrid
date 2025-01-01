import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GeneralSettings, SidebarPosition } from '../../../../types';

interface SidebarPositionSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const SidebarPositionSettings: React.FC<SidebarPositionSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>Position</Label>
      <Select
        value={settings.sidebarPosition}
        onValueChange={(value: SidebarPosition) => 
          onSettingsChange({ ...settings, sidebarPosition: value })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="left">Left</SelectItem>
          <SelectItem value="right">Right</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500">
        Choose which side of the grid to show the sidebar
      </p>
    </div>
  );
};