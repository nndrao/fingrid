import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypographyControls } from '../typography/TypographyControls';
import { ColumnNode } from '../../types';

interface TypographySettingsProps {
  column: ColumnNode;
  onUpdate: (changes: Partial<ColumnNode>) => void;
}

export const TypographySettings: React.FC<TypographySettingsProps> = ({
  column,
  onUpdate,
}) => {
  const headerStyle = column.headerStyle || {};
  const cellStyle = column.cellStyle || {};

  const handleHeaderStyleChange = (style: Record<string, string | number>) => {
    onUpdate({
      headerStyle: { ...headerStyle, ...style }
    });
  };

  const handleCellStyleChange = (style: Record<string, string | number>) => {
    onUpdate({
      cellStyle: { ...cellStyle, ...style }
    });
  };

  return (
    <Tabs defaultValue="header" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="header">Header</TabsTrigger>
        <TabsTrigger value="cell">Cell</TabsTrigger>
      </TabsList>

      <TabsContent value="header" className="mt-4">
        <TypographyControls
          style={headerStyle}
          onChange={handleHeaderStyleChange}
        />
      </TabsContent>

      <TabsContent value="cell" className="mt-4">
        <TypographyControls
          style={cellStyle}
          onChange={handleCellStyleChange}
        />
      </TabsContent>
    </Tabs>
  );
};