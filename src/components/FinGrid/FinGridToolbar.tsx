import React from 'react';

interface FinGridToolbarProps {
  children: React.ReactNode;
}

export const FinGridToolbar: React.FC<FinGridToolbarProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
      {children}
    </div>
  );
};