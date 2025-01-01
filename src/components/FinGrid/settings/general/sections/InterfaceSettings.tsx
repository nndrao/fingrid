import React from 'react';
import { GeneralSettings } from '../../../types/settings';
import { SettingCard } from '../components/SettingCard';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InterfaceSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const InterfaceSettings: React.FC<InterfaceSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleStatusBarChange = (show: boolean) => {
    onSettingsChange({
      ...settings,
      statusBar: {
        ...settings.statusBar,
        show
      }
    });
  };

  const handlePositionChange = (position: 'top' | 'bottom') => {
    onSettingsChange({
      ...settings,
      statusBar: {
        ...settings.statusBar,
        position
      }
    });
  };

  const handleComponentToggle = (componentId: string, enabled: boolean) => {
    onSettingsChange({
      ...settings,
      statusBar: {
        ...settings.statusBar,
        components: settings.statusBar.components.map(comp =>
          comp.id === componentId ? { ...comp, enabled } : comp
        )
      }
    });
  };

  return (
    <SettingCard
      title="Interface Elements"
      description="Configure grid interface components"
    >
      <div className="space-y-6">
        {/* Status Bar Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Status Bar</Label>
              <p className="text-sm text-gray-500">Display status information below the grid</p>
            </div>
            <Switch
              checked={settings.statusBar.show}
              onCheckedChange={handleStatusBarChange}
            />
          </div>

          {settings.statusBar.show && (
            <>
              <div className="space-y-2">
                <Label>Position</Label>
                <Select
                  value={settings.statusBar.position}
                  onValueChange={handlePositionChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Components</Label>
                <div className="space-y-2 border rounded-lg p-3">
                  {settings.statusBar.components.map((component) => (
                    <div key={component.id} className="flex items-center justify-between">
                      <Label>{component.name}</Label>
                      <Switch
                        checked={component.enabled}
                        onCheckedChange={(checked) => handleComponentToggle(component.id, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SettingCard>
  );
};