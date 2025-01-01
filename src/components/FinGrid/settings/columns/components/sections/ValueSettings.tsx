import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnNode } from '../../types';

interface ValueSettingsProps {
  column: ColumnNode;
  onUpdate: (changes: Partial<ColumnNode>) => void;
}

export const ValueSettings: React.FC<ValueSettingsProps> = ({
  column,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Format Type</Label>
        <Select
          value={column.valueFormatter || 'none'}
          onValueChange={(value) => onUpdate({ valueFormatter: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="currency">Currency</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {column.valueFormatter === 'custom' && (
        <div className="space-y-2">
          <Label>Custom Format</Label>
          <Input
            placeholder="Enter custom format"
            value={column.valueFormatter || ''}
            onChange={(e) => onUpdate({ valueFormatter: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};