import React from 'react';
import { GeneralSettings, StatusBarComponent, DEFAULT_STATUS_BAR_COMPONENTS } from '../../../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SettingsGroup } from '../../components/SettingsGroup';
import { StatusComponentList } from './StatusComponentList';

interface StatusBarSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const StatusBarSettings: React.FC<StatusBarSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleStatusComponentToggle = (componentId: string, enabled: boolean) => {
    const updatedComponents = settings.statusBar.components.map(comp => 
      comp.id === componentId ? { ...comp, enabled } : comp
    );
    onSettingsChange({
      ...settings,
      statusBar: {
        ...settings.statusBar,
        components: updatedComponents
      }
    });
  };

  const handleComponentsReorder = (newComponents: StatusBarComponent[]) => {
    onSettingsChange({
      ...settings,
      statusBar: {
        ...settings.statusBar,
        components: newComponents
      }
    });
  };

  return (
    <SettingsGroup title="Status Bar">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Show Status Bar</Label>
          <Switch
            checked={settings.statusBar.show}
            onCheckedChange={(checked) => 
              onSettingsChange({
                ...settings,
                statusBar: {
                  ...settings.statusBar,
                  show: checked
                }
              })
            }
          />
        </div>

        {settings.statusBar.show && (
          <>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={settings.statusBar.position}
                onValueChange={(value: 'top' | 'bottom') => 
                  onSettingsChange({
                    ...settings,
                    statusBar: {
                      ...settings.statusBar,
                      position: value
                    }
                  })
                }
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
              <StatusComponentList
                components={settings.statusBar.components}
                onToggle={handleStatusComponentToggle}
                onReorder={handleComponentsReorder}
              />
            </div>
          </>
        )}
      </div>
    </SettingsGroup>
  );
};