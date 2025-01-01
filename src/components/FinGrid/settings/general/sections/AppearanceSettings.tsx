import React from 'react';
import { GeneralSettings } from '../../../types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SettingCard } from '../components/SettingCard';
import { GRID_THEMES } from '../../../constants/themes';

interface AppearanceSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Ensure we have default values for all numeric inputs
  const rowHeight = settings.rowHeight ?? 40;
  const headerHeight = settings.headerHeight ?? 45;
  const defaultColumnWidth = settings.defaultColumnWidth ?? 150;
  const theme = settings.theme ?? 'alpine';

  const handleNumberChange = (field: keyof GeneralSettings, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onSettingsChange({
        ...settings,
        [field]: numValue
      });
    }
  };

  return (
    <SettingCard
      title="Appearance"
      description="Visual styling and dimensions"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Row Height</Label>
            <Input
              type="number"
              min={25}
              max={100}
              value={rowHeight}
              onChange={(e) => handleNumberChange('rowHeight', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Header Height</Label>
            <Input
              type="number"
              min={25}
              max={100}
              value={headerHeight}
              onChange={(e) => handleNumberChange('headerHeight', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Theme</Label>
          <Select
            value={theme}
            onValueChange={(value) => 
              onSettingsChange({ ...settings, theme: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {GRID_THEMES.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Default Column Width</Label>
          <Input
            type="number"
            min={50}
            max={500}
            value={defaultColumnWidth}
            onChange={(e) => handleNumberChange('defaultColumnWidth', e.target.value)}
          />
        </div>
      </div>
    </SettingCard>
  );
};