import React from 'react';
import { GeneralSettings } from '../../../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SettingsGroup } from '../components/SettingsGroup';

interface FloatingFilterSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const FloatingFilterSettings: React.FC<FloatingFilterSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SettingsGroup title="Floating Filters">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Floating Filters</Label>
          <Switch
            checked={settings.enableFloatingFilter}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableFloatingFilter: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Persist Filter Settings</Label>
          <Switch
            checked={settings.persistFilterSettings}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, persistFilterSettings: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Default Filter State</Label>
          <Switch
            checked={settings.defaultFloatingFilterState}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, defaultFloatingFilterState: checked })
            }
          />
        </div>
      </div>
    </SettingsGroup>
  );
};