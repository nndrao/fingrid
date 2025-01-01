import React from 'react';
import { GeneralSettings, RowSelectionMode } from '../../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { InfoTooltip } from '../../common/InfoTooltip';
import { RowSelectionSettings } from './RowSelectionSettings';

interface FeaturesSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const FeaturesSettings: React.FC<FeaturesSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleRowSelectionModeChange = (mode: RowSelectionMode) => {
    onSettingsChange({
      ...settings,
      rowSelectionMode: mode,
      enableRowSelection: mode !== 'none'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Features & Behavior</h3>
        <InfoTooltip content="Configure grid functionality and behavior" />
      </div>

      <div className="space-y-4">
        {/* Row Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableRowSelection">Row Selection</Label>
              <p className="text-sm text-gray-500">Configure row selection behavior</p>
            </div>
            <Switch
              id="enableRowSelection"
              checked={settings.enableRowSelection}
              onCheckedChange={(checked) => 
                onSettingsChange({
                  ...settings,
                  enableRowSelection: checked,
                  rowSelectionMode: checked ? 'multiple' : 'none'
                })
              }
            />
          </div>

          <RowSelectionSettings
            enabled={settings.enableRowSelection}
            mode={settings.rowSelectionMode}
            onModeChange={handleRowSelectionModeChange}
          />
        </div>

        {/* Other features remain the same */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableColumnResize">Column Resize</Label>
            <p className="text-sm text-gray-500">Allow columns to be resized</p>
          </div>
          <Switch
            id="enableColumnResize"
            checked={settings.enableColumnResize}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableColumnResize: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableAutoSizeColumns">Auto-size Columns</Label>
            <p className="text-sm text-gray-500">Automatically fit columns to content</p>
          </div>
          <Switch
            id="enableAutoSizeColumns"
            checked={settings.enableAutoSizeColumns}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableAutoSizeColumns: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableSorting">Sorting</Label>
            <p className="text-sm text-gray-500">Enable column sorting</p>
          </div>
          <Switch
            id="enableSorting"
            checked={settings.enableSorting}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableSorting: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableFiltering">Filtering</Label>
            <p className="text-sm text-gray-500">Enable column filtering</p>
          </div>
          <Switch
            id="enableFiltering"
            checked={settings.enableFiltering}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableFiltering: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};