import React from 'react';
import { SettingCard } from '../../components/SettingCard';
import { TypographyControls } from './typography';

interface TypographySettingsProps {
  settings: {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    textColor: string;
    enableWordWrap: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export const TypographySettings: React.FC<TypographySettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const handleChange = (key: string, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <SettingCard
      title="Typography"
      description="Configure text appearance"
    >
      <TypographyControls
        {...settings}
        onChange={handleChange}
      />
    </SettingCard>
  );
}; 