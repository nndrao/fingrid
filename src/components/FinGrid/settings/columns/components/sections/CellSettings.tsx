import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ColumnNode } from '../../types';

interface CellSettingsProps {
  column: ColumnNode;
  onUpdate: (changes: Partial<ColumnNode>) => void;
}

export const CellSettings: React.FC<CellSettingsProps> = ({
  column,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select
          value={column.cellStyle?.textAlign || 'left'}
          onValueChange={(value) => 
            onUpdate({ 
              cellStyle: { 
                ...column.cellStyle,
                textAlign: value 
              } 
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <Input
            type="color"
            value={column.cellStyle?.backgroundColor || '#ffffff'}
            onChange={(e) => 
              onUpdate({
                cellStyle: {
                  ...column.cellStyle,
                  backgroundColor: e.target.value
                }
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <Input
            type="color"
            value={column.cellStyle?.color || '#000000'}
            onChange={(e) => 
              onUpdate({
                cellStyle: {
                  ...column.cellStyle,
                  color: e.target.value
                }
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Editable</Label>
        <Switch
          checked={column.editable || false}
          onCheckedChange={(checked) => onUpdate({ editable: checked })}
        />
      </div>
    </div>
  );
};