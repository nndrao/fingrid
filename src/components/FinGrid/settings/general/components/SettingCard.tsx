import React from 'react';

interface SettingCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SettingCard: React.FC<SettingCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b bg-gray-50/50 px-4 py-3">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};