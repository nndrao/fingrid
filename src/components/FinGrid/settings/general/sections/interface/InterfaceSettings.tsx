import React from 'react';
import { GeneralSettings } from '../../../../types';
import { SettingCard } from '../../components/SettingCard';
import { FloatingFilterSettings } from './FloatingFilterSettings';
import { SidebarSettings } from './SidebarSettings';
import { StatusBarSettings } from './StatusBarSettings';

interface InterfaceSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const InterfaceSettings: React.FC<InterfaceSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SettingCard
      title="Interface Elements"
      description="Configure grid interface components"
    >
      <div className="space-y-6">
        <FloatingFilterSettings settings={settings} onSettingsChange={onSettingsChange} />
        <SidebarSettings settings={settings} onSettingsChange={onSettingsChange} />
        <StatusBarSettings settings={settings} onSettingsChange={onSettingsChange} />
      </div>
    </SettingCard>
  );
};