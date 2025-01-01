import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeaderSettings } from './sections/HeaderSettings';
import { CellSettings } from './sections/CellSettings';
import { ValueSettings } from './sections/ValueSettings';
import { ComponentSettings } from './sections/ComponentSettings';
import { TypographySettings } from './sections/TypographySettings';
import { ColumnNode, ColumnUpdate } from '../types';

interface ColumnEditorProps {
  column: ColumnNode;
  onUpdate: (update: ColumnUpdate) => void;
}

export const ColumnEditor: React.FC<ColumnEditorProps> = ({
  column,
  onUpdate,
}) => {
  const handleUpdate = (changes: Partial<ColumnNode>) => {
    onUpdate({ id: column.id, changes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          {column.headerName || column.field}
        </h3>
        <p className="text-sm text-gray-500">
          Configure column settings and appearance
        </p>
      </div>

      <Tabs defaultValue="header">
        <TabsList>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="cell">Cell</TabsTrigger>
          <TabsTrigger value="value">Value</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <HeaderSettings column={column} onUpdate={handleUpdate} />
        </TabsContent>

        <TabsContent value="cell">
          <CellSettings column={column} onUpdate={handleUpdate} />
        </TabsContent>

        <TabsContent value="value">
          <ValueSettings column={column} onUpdate={handleUpdate} />
        </TabsContent>

        <TabsContent value="component">
          <ComponentSettings column={column} onUpdate={handleUpdate} />
        </TabsContent>

        <TabsContent value="typography">
          <TypographySettings column={column} onUpdate={handleUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};