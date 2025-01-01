import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnGroup } from '../../types';

interface CreateGroupFormProps {
  columns: string[];
  onGroupCreate: (group: ColumnGroup) => void;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  columns,
  onGroupCreate,
}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColumns = columns.filter(col => 
    col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName && selectedColumns.length > 0) {
      onGroupCreate({ name: groupName, columns: selectedColumns });
      setGroupName('');
      setSelectedColumns([]);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Group Name</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        {!groupName && <p className="text-sm text-red-500 mt-1">Group name is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Available Columns</label>
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search columns..."
            className="w-full pl-8 rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="border rounded-lg p-2 max-h-[300px] overflow-y-auto">
          {filteredColumns.map((column) => (
            <label key={column} className="flex items-center p-2 hover:bg-gray-50 rounded">
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
              {column}
            </label>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500">
            {selectedColumns.length} columns selected
          </span>
          {selectedColumns.length === 0 && (
            <span className="text-red-500">Select at least one column</span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!groupName || selectedColumns.length === 0}
      >
        Create Group
      </Button>
    </form>
  );
};