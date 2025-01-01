import React from 'react';
import { GeneralSettings } from '../../../types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { InfoTooltip } from '../../common/InfoTooltip';

interface HeaderSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const HeaderSettings: React.FC<HeaderSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Header & Toolbars</h3>
        <InfoTooltip content="Configure grid title and toolbar visibility" />
      </div>

      <div className="space-y-6">
        {/* Grid Title Section */}
        <div className="space-y-4 pb-4 border-b">
          <div className="space-y-2">
            <Label htmlFor="title">Grid Title</Label>
            <Input
              id="title"
              value={settings.title || ''}
              onChange={(e) => onSettingsChange({ ...settings, title: e.target.value })}
              placeholder="Enter grid title"
            />
          </div>
        </div>

        {/* Toolbar Settings Section */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Toolbar Visibility</h4>
            <p className="text-sm text-gray-500 mb-4">Configure which toolbars are displayed</p>
          </div>

          <div className="space-y-4">
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
      </div>
    </div>
  );
};