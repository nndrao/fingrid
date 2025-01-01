import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface TypographyControlsProps {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
  textColor: string;
  enableWordWrap: boolean;
  onChange: (key: string, value: any) => void;
}

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  textColor,
  enableWordWrap,
  onChange
}) => {
  const fontWeightOptions = [
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' }
  ];

  const fontFamilyOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input
            type="number"
            value={fontSize}
            onChange={(e) => onChange('fontSize', parseInt(e.target.value))}
            min={8}
            max={32}
          />
        </div>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={fontFamily}
            onValueChange={(value) => onChange('fontFamily', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Weight</Label>
          <Select
            value={fontWeight}
            onValueChange={(value) => onChange('fontWeight', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontWeightOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Align</Label>
          <Select
            value={textAlign}
            onValueChange={(value: 'left' | 'center' | 'right') => onChange('textAlign', value)}
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
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <Input
          type="color"
          value={textColor}
          onChange={(e) => onChange('textColor', e.target.value)}
          className="h-9 w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Enable Word Wrap</Label>
        <Switch
          checked={enableWordWrap}
          onCheckedChange={(checked) => onChange('enableWordWrap', checked)}
        />
      </div>
    </div>
  );
};