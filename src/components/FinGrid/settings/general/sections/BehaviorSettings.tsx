import React from 'react';
import { GeneralSettings } from '../../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SettingCard } from '../components/SettingCard';

interface BehaviorSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const BehaviorSettings: React.FC<BehaviorSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SettingCard
      title="Behavior"
      description="Grid interactions and functionality"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Row Selection</Label>
          <div className="flex items-center justify-between">
            <Switch
              checked={settings.enableRowSelection}
              onCheckedChange={(checked) => 
                onSettingsChange({
                  ...settings,
                  enableRowSelection: checked,
                  rowSelectionMode: checked ? 'multiple' : 'none'
                })
              }
            />
            {settings.enableRowSelection && (
              <Select
                value={settings.rowSelectionMode}
                onValueChange={(value: 'single' | 'multiple') => 
                  onSettingsChange({ ...settings, rowSelectionMode: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="multiple">Multiple</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Sorting</Label>
            <Switch
              checked={settings.enableSorting}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, enableSorting: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Filtering</Label>
            <Switch
              checked={settings.enableFiltering}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, enableFiltering: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Column Resize</Label>
            <Switch
              checked={settings.enableColumnResize}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, enableColumnResize: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Auto-size Columns</Label>
            <Switch
              checked={settings.enableAutoSizeColumns}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, enableAutoSizeColumns: checked })
              }
            />
          </div>
        </div>
      </div>
    </SettingCard>
  );
};