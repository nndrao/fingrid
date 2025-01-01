import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  return (
    <div className="relative group">
      <HelpCircle className="w-4 h-4 text-gray-400" />
      <div className="absolute right-0 w-48 p-2 text-xs text-white bg-black rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
        {content}
      </div>
    </div>
  );
};