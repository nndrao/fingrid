import React from 'react';
import { Search } from 'lucide-react';

interface ColumnSelectorProps {
  columns: string[];
  selectedColumns: string[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectionChange: (columns: string[]) => void;
  touched: boolean;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  selectedColumns,
  searchTerm,
  onSearchChange,
  onSelectionChange,
  touched,
}) => {
  const filteredColumns = columns.filter(col => 
    col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">Available Columns</label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search columns..."
          className="w-full pl-8 rounded-md border border-gray-300 p-2"
        />
      </div>

      <div 
        className="border rounded-lg overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 450px)', minHeight: '200px' }}
      >
        {filteredColumns.map((column) => (
          <label 
            key={column} 
            className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedColumns.includes(column)}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectionChange([...selectedColumns, column]);
                } else {
                  onSelectionChange(selectedColumns.filter(col => col !== column));
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
          {selectedColumns.length} columns selected
        </span>
        {touched && selectedColumns.length === 0 && (
          <span className="text-red-500" role="alert">
            Select at least one column
          </span>
        )}
      </div>
    </div>
  );
};