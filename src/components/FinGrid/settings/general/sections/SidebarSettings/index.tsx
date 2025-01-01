import React from 'react';
import { GeneralSettings } from '../../../../types';
import { SidebarBasicSettings } from './SidebarBasicSettings';
import { SidebarPositionSettings } from './SidebarPositionSettings';
import { SidebarDimensionSettings } from './SidebarDimensionSettings';
import { SettingCard } from '../../components/SettingCard';

interface SidebarSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SettingCard
      title="Sidebar"
      description="Configure grid sidebar appearance and behavior"
    >
      <div className="space-y-6">
        <SidebarBasicSettings 
          settings={settings} 
          onSettingsChange={onSettingsChange} 
        />
        
        {settings.showSidebar && (
          <>
            <SidebarPositionSettings 
              settings={settings} 
              onSettingsChange={onSettingsChange} 
            />
            <SidebarDimensionSettings 
              settings={settings} 
              onSettingsChange={onSettingsChange} 
            />
          </>
        )}
      </div>
    </SettingCard>
  );
};