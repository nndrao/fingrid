import React from 'react';

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">{title}</h4>
      {children}
    </div>
  );
};