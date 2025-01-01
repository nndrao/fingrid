import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ColumnNode } from '../../types';

interface ComponentSettingsProps {
  column: ColumnNode;
  onUpdate: (changes: Partial<ColumnNode>) => void;
}

export const ComponentSettings: React.FC<ComponentSettingsProps> = ({
  column,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Cell Renderer</Label>
        <Select
          value={column.cellRenderer || 'default'}
          onValueChange={(value) => onUpdate({ cellRenderer: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="checkbox">Checkbox</SelectItem>
            <SelectItem value="date">Date Picker</SelectItem>
            <SelectItem value="select">Select</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label>Sortable</Label>
        <Switch
          checked={column.sortable || false}
          onCheckedChange={(checked) => onUpdate({ sortable: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Filterable</Label>
        <Switch
          checked={!!column.filter}
          onCheckedChange={(checked) => onUpdate({ filter: checked })}
        />
      </div>
    </div>
  );
};