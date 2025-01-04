import React from 'react';
import { GeneralSettings } from '../../../types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { SettingCard } from '../components/SettingCard';

interface LayoutSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const LayoutSettings: React.FC<LayoutSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SettingCard
      title="Layout"
      description="Grid layout and pagination"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Grid Title</Label>
          <Input
            value={settings.title}
            onChange={(e) => onSettingsChange({
              ...settings,
              title: e.target.value
            })}
            placeholder="Enter grid title"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Top Toolbar</Label>
            <Switch
              checked={settings.showTopToolbar}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, showTopToolbar: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Show Bottom Toolbar</Label>
            <Switch
              checked={settings.showBottomToolbar}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, showBottomToolbar: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Enable Pagination</Label>
            <Switch
              checked={settings.enablePagination}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, enablePagination: checked })
              }
            />
          </div>

          {settings.enablePagination && (
            <div className="space-y-2">
              <Label>Rows per Page</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={settings.rowsPerPage}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  rowsPerPage: parseInt(e.target.value) || 10
                })}
              />
            </div>
          )}
        </div>
      </div>
    </SettingCard>
  );
};