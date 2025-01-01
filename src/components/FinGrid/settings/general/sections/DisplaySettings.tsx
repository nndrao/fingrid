import React from 'react';
import { GeneralSettings } from '../../../types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InfoTooltip } from '../../common/InfoTooltip';

interface DisplaySettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleHeightChange = (field: 'rowHeight' | 'headerHeight', value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 25 && numValue <= 100) {
      onSettingsChange({
        ...settings,
        [field]: numValue
      });
    }
  };

  // Ensure we always have valid numbers for the height inputs
  const rowHeight = settings.rowHeight || 30;
  const headerHeight = settings.headerHeight || 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Display Settings</h3>
        <InfoTooltip content="Configure the visual appearance of the grid" />
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={settings.theme || 'light'}
            onValueChange={(value: 'light' | 'dark') => 
              onSettingsChange({ ...settings, theme: value })
            }
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Row Height */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="rowHeight">Row Height (px)</Label>
            <span className="text-sm text-gray-500">Min: 25, Max: 100</span>
          </div>
          <Input
            id="rowHeight"
            type="number"
            min={25}
            max={100}
            value={rowHeight}
            onChange={(e) => handleHeightChange('rowHeight', e.target.value)}
          />
        </div>

        {/* Header Height */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="headerHeight">Header Height (px)</Label>
            <span className="text-sm text-gray-500">Min: 25, Max: 100</span>
          </div>
          <Input
            id="headerHeight"
            type="number"
            min={25}
            max={100}
            value={headerHeight}
            onChange={(e) => handleHeightChange('headerHeight', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};