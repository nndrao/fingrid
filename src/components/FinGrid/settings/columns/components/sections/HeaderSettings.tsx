import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnNode } from '../../types';

interface HeaderSettingsProps {
  column: ColumnNode;
  onUpdate: (changes: Partial<ColumnNode>) => void;
}

export const HeaderSettings: React.FC<HeaderSettingsProps> = ({
  column,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Header Text</Label>
        <Input
          value={column.headerName}
          onChange={(e) => onUpdate({ headerName: e.target.value })}
          placeholder="Enter header text"
        />
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select
          value={column.headerStyle?.textAlign || 'left'}
          onValueChange={(value) => 
            onUpdate({ 
              headerStyle: { 
                ...column.headerStyle,
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
            value={column.headerStyle?.backgroundColor || '#ffffff'}
            onChange={(e) => 
              onUpdate({
                headerStyle: {
                  ...column.headerStyle,
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
            value={column.headerStyle?.color || '#000000'}
            onChange={(e) => 
              onUpdate({
                headerStyle: {
                  ...column.headerStyle,
                  color: e.target.value
                }
              })
            }
          />
        </div>
      </div>
    </div>
  );
};