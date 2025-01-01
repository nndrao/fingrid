import React from 'react';
import { GeneralSettings, DEFAULT_SETTINGS } from '../../types';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { AppearanceSettings } from './sections/AppearanceSettings';
import { BehaviorSettings } from './sections/BehaviorSettings';
import { LayoutSettings } from './sections/LayoutSettings';
import { InterfaceSettings } from './sections/InterfaceSettings';

interface GeneralSectionProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleResetToDefaults = () => {
    onSettingsChange(DEFAULT_SETTINGS);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">General Settings</h2>
          <p className="text-sm text-gray-500">Configure grid appearance and behavior</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleResetToDefaults}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            <AppearanceSettings settings={settings} onSettingsChange={onSettingsChange} />
            <BehaviorSettings settings={settings} onSettingsChange={onSettingsChange} />
          </div>
          <div className="space-y-6">
            <LayoutSettings settings={settings} onSettingsChange={onSettingsChange} />
            <InterfaceSettings settings={settings} onSettingsChange={onSettingsChange} />
          </div>
        </div>
      </div>
    </div>
  );
};