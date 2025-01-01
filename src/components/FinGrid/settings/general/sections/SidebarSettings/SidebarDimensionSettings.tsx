import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { GeneralSettings } from '../../../../types';

interface SidebarDimensionSettingsProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const SidebarDimensionSettings: React.FC<SidebarDimensionSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Ensure we have a default value
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
    <div className="space-y-2">
      <Label>Width (px)</Label>
      <Input
        type="number"
        min={150}
        max={500}
        value={sidebarWidth}
        onChange={(e) => handleWidthChange(e.target.value)}
      />
      <p className="text-sm text-gray-500">
        Set the width of the sidebar (150-500 pixels)
      </p>
    </div>
  );
};