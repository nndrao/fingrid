import React from 'react';
import { ColumnTree } from './components/ColumnTree';
import { ColumnEditor } from './components/ColumnEditor';
import { useColumnManager } from './hooks/useColumnManager';
import { useColumnGroups } from '../../context/ColumnGroupsContext';

export const ColumnsSection: React.FC = () => {
  const {
    columnTree,
    selectedColumn,
    handleColumnSelect,
    handleColumnUpdate,
    handleColumnMove,
    handleGroupToggle,
  } = useColumnManager();

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80">
        <h2 className="text-lg font-semibold">Column Management</h2>
        <p className="text-sm text-gray-500">Configure and organize grid columns</p>
      </div>

      <div className="flex-1 grid grid-cols-[350px_1fr] min-h-0">
        <div className="border-r overflow-y-auto p-4">
          <ColumnTree
            columns={columnTree}
            selectedColumnId={selectedColumn?.id}
            onColumnSelect={handleColumnSelect}
            onColumnMove={handleColumnMove}
            onGroupToggle={handleGroupToggle}
          />
        </div>
        <div className="overflow-y-auto p-4">
          {selectedColumn && (
            <ColumnEditor
              column={selectedColumn}
              onUpdate={handleColumnUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};