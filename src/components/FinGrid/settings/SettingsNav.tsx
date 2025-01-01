import React from 'react';
import { SETTINGS_TABS } from '../constants/settingsTabs';
import { cn } from '@/lib/utils';

interface SettingsNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsNav: React.FC<SettingsNavProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <nav className="w-60 border-r bg-gray-50/50">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">Configure grid options</p>
      </div>
      <div className="space-y-1">
        {SETTINGS_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100',
                activeTab === tab.id && 'bg-gray-100 border-r-2 border-black font-medium'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};