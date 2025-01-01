```tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Unit = 'px' | 'rem' | 'pt';

interface FontSizeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FontSizeInput: React.FC<FontSizeInputProps> = ({ value, onChange }) => {
  const [size, unit] = React.useMemo(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(px|rem|pt)$/);
    return match ? [match[1], match[2] as Unit] : ['14', 'px'];
  }, [value]);

  const handleSizeChange = (newSize: string) => {
    if (/^\d*\.?\d*$/.test(newSize)) {
      onChange(`${newSize}${unit}`);
    }
  };

  const handleUnitChange = (newUnit: Unit) => {
    onChange(`${size}${newUnit}`);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        value={size}
        onChange={(e) => handleSizeChange(e.target.value)}
        className="w-20"
        min="0"
        step="0.5"
      />
      <Select value={unit} onValueChange={handleUnitChange}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="px">px</SelectItem>
          <SelectItem value="rem">rem</SelectItem>
          <SelectItem value="pt">pt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
```