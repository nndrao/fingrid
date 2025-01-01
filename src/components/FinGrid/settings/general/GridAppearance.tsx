import React from 'react';
import { GeneralSettings } from '../../types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GridAppearanceProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const GridAppearance: React.FC<GridAppearanceProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Grid Appearance</h3>
      
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          value={settings.theme}
          onValueChange={(value: 'light' | 'dark') => 
            onSettingsChange({ ...settings, theme: value })
          }
        >
          <SelectTrigger id="theme" className="w-32">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};