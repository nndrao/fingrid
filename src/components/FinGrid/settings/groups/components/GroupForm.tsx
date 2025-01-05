import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColumnGroup } from '../../../types';
import { useColumnGroups } from '../../../context/ColumnGroupsContext';

interface GroupFormProps {
  mode: 'create' | 'edit';
  availableColumns: string[];
  selectedGroupColumns: string[];
  selectedGroup: ColumnGroup | null;
  onSubmit: (group: Omit<ColumnGroup, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({
  mode,
  availableColumns,
  selectedGroupColumns,
  selectedGroup,
  onSubmit,
  onCancel,
}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; columns?: string }>({});

  const { state: { groups }, isGroupNameValid } = useColumnGroups();

  useEffect(() => {
    if (mode === 'edit' && selectedGroup) {
      setGroupName(selectedGroup.name);
      setSelectedColumns(selectedGroupColumns);
    } else {
      setGroupName('');
      setSelectedColumns([]);
    }
    setTouched(false);
    setErrors({});
    setSearchTerm('');
  }, [mode, selectedGroup, selectedGroupColumns]);

  const validate = () => {
    const newErrors: { name?: string; columns?: string } = {};
    
    if (!groupName.trim()) {
      newErrors.name = 'Group name is required';
    } else if (!isGroupNameValid(groupName, selectedGroup?.id)) {
      newErrors.name = 'A group with this name already exists';
    }
    
    if (selectedColumns.length === 0) {
      newErrors.columns = 'Select at least one column';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    if (validate()) {
      debugger
      onSubmit({
        id: selectedGroup?.id,
        name: groupName.trim(),
        columns: selectedColumns,
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setGroupName(newName);
    
    if (touched) {
      if (!newName.trim()) {
        setErrors(prev => ({ ...prev, name: 'Group name is required' }));
      } else if (!isGroupNameValid(newName, selectedGroup?.id)) {
        setErrors(prev => ({ ...prev, name: 'A group with this name already exists' }));
      } else {
        setErrors(prev => ({ ...prev, name: undefined }));
      }
    }
  };

  // Combine available and currently selected columns
  const allColumns = Array.from(new Set([...availableColumns, ...selectedColumns])).sort();
  const filteredColumns = allColumns.filter(col => 
    col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full border rounded-lg bg-white">
      <div className="p-4 border-b">
        <h3 className="font-medium">
          {mode === 'edit' ? 'Edit Group' : 'Create New Group'}
        </h3>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          <Label>Group Name</Label>
          <Input
            value={groupName}
            onChange={handleNameChange}
            onBlur={() => setTouched(true)}
            placeholder="Enter group name"
            aria-invalid={!!errors.name}
          />
          {touched && errors.name && (
            <p className="text-sm text-red-500" role="alert">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Columns</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search columns..."
              className="pl-8"
            />
          </div>

          <div className="border rounded-lg p-2 max-h-[300px] overflow-y-auto">
            {filteredColumns.map((column) => (
              <label 
                key={column} 
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded-md"
              >
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedColumns([...selectedColumns, column]);
                    } else {
                      setSelectedColumns(selectedColumns.filter(col => col !== column));
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm">{column}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''} selected
            </span>
            {touched && errors.columns && (
              <span className="text-red-500" role="alert">{errors.columns}</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!groupName || selectedColumns.length === 0 || Object.keys(errors).length > 0}
        >
          {mode === 'edit' ? 'Update Group' : 'Create Group'}
        </Button>
      </div>
    </form>
  );
};