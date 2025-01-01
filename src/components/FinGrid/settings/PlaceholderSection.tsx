import React from 'react';

interface PlaceholderSectionProps {
  title: string;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">This section is coming soon</p>
      </div>
      <div className="flex-1 p-6">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            This feature is currently under development.
            Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
};