import React, { useState, useEffect } from 'react';
import { ColumnGroup } from '../../types';
import { ColumnSelector } from './ColumnSelector';
import { Button } from '@/components/ui/button';

interface GroupFormProps {
  columns: string[];
  selectedGroup: ColumnGroup | null;
  onSubmit: (group: ColumnGroup) => void;
  onCancel: () => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({
  columns,
  selectedGroup,
  onSubmit,
  onCancel,
}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.name);
      setSelectedColumns(selectedGroup.columns);
    } else {
      setGroupName('');
      setSelectedColumns([]);
    }
    setTouched(false);
  }, [selectedGroup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    if (groupName && selectedColumns.length > 0) {
      onSubmit({ name: groupName, columns: selectedColumns });
      setGroupName('');
      setSelectedColumns([]);
      setSearchTerm('');
      setTouched(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full border rounded-lg bg-white">
      <div className="p-4 border-b">
        <h3 className="font-medium">
          {selectedGroup ? 'Edit Group' : 'Create New Group'}
        </h3>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1.5">
          <label htmlFor="groupName" className="text-sm font-medium">
            Group Name
          </label>
          <input
            id="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Enter group name"
            className="w-full rounded-md border border-gray-300 p-2"
            aria-invalid={touched && !groupName ? "true" : "false"}
          />
          {touched && !groupName && (
            <p className="text-sm text-red-500" role="alert">
              Group name is required
            </p>
          )}
        </div>

        <ColumnSelector
          columns={columns}
          selectedColumns={selectedColumns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectionChange={setSelectedColumns}
          touched={touched}
        />
      </div>

      <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!groupName || selectedColumns.length === 0}
        >
          {selectedGroup ? 'Update Group' : 'Create Group'}
        </Button>
      </div>
    </form>
  );
};