import React from 'react';
import { GeneralSettings } from '../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ToolbarSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const ToolbarSettings: React.FC<ToolbarSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Toolbar Settings</h3>
        <p className="text-sm text-gray-500">Configure toolbar visibility</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="showTopToolbar">Top Toolbar</Label>
            <p className="text-sm text-gray-500">Show the toolbar above the grid</p>
          </div>
          <Switch
            id="showTopToolbar"
            checked={settings.showTopToolbar}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, showTopToolbar: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="showBottomToolbar">Bottom Toolbar</Label>
            <p className="text-sm text-gray-500">Show the toolbar below the grid</p>
          </div>
          <Switch
            id="showBottomToolbar"
            checked={settings.showBottomToolbar}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, showBottomToolbar: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};