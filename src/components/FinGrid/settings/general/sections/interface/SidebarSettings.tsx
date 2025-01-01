import React from 'react';
import { GeneralSettings } from '../../../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SettingsGroup } from '../components/SettingsGroup';

interface SidebarSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Ensure we have a default value for sidebar width
  const sidebarWidth = settings.sidebarWidth ?? 250;

  const handleWidthChange = (value: string) => {
    const width = parseInt(value, 10);
    if (!isNaN(width) && width >= 150 && width <= 500) {
      onSettingsChange({
        ...settings,
        sidebarWidth: width
      });
    }
  };

  return (
    <SettingsGroup title="Sidebar">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Show Sidebar</Label>
          <Switch
            checked={settings.showSidebar}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, showSidebar: checked })
            }
          />
        </div>

        {settings.showSidebar && (
          <>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={settings.sidebarPosition}
                onValueChange={(value: 'left' | 'right') => 
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
            </div>

            <div className="space-y-2">
              <Label>Width (px)</Label>
              <Input
                type="number"
                min={150}
                max={500}
                value={sidebarWidth}
                onChange={(e) => handleWidthChange(e.target.value)}
              />
              <p className="text-xs text-gray-500">Min: 150px, Max: 500px</p>
            </div>

            <div className="flex items-center justify-between">
              <Label>Initially Expanded</Label>
              <Switch
                checked={settings.sidebarExpanded}
                onCheckedChange={(checked) => 
                  onSettingsChange({ ...settings, sidebarExpanded: checked })
                }
              />
            </div>
          </>
        )}
      </div>
    </SettingsGroup>
  );
};