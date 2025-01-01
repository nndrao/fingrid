import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GeneralSettings } from '../../../../types';

interface SidebarBasicSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const SidebarBasicSettings: React.FC<SidebarBasicSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Show Sidebar</Label>
          <p className="text-sm text-gray-500">Enable the grid sidebar</p>
        </div>
        <Switch
          checked={settings.showSidebar}
          onCheckedChange={(checked) => 
            onSettingsChange({ ...settings, showSidebar: checked })
          }
        />
      </div>

      {settings.showSidebar && (
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Initially Expanded</Label>
            <p className="text-sm text-gray-500">Show sidebar when grid loads</p>
          </div>
          <Switch
            checked={settings.sidebarExpanded}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, sidebarExpanded: checked })
            }
          />
        </div>
      )}
    </div>
  );
};