import React, { useState, useCallback } from 'react';
import { GroupList } from './components/GroupList';
import { GroupForm } from './components/GroupForm';
import { ColumnGroup } from '../../types/columnGroup';
import { useColumnGroups } from '../../context/ColumnGroupsContext';

interface GroupsSectionProps {
  columns: string[];
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({ columns }) => {
  const [selectedGroup, setSelectedGroup] = useState<ColumnGroup | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  
  const {
    state: { groups, activeGroups },
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroupActive
  } = useColumnGroups();

  const getAvailableColumns = useCallback(() => {
    const usedColumns = groups
      .filter(group => group.id !== selectedGroup?.id)
      .flatMap(group => group.columns);
    return columns.filter(col => !usedColumns.includes(col));
  }, [columns, groups, selectedGroup]);

  const handleSubmit = (group: Omit<ColumnGroup, 'id'> & { id?: string }) => {
    if (mode === 'edit' && group.id) {
      updateGroup(group.id, group);
    } else {
      addGroup(group);
    }
    setSelectedGroup(null);
    setMode('create');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80">
        <h2 className="text-lg font-semibold">Column Groups</h2>
        <p className="text-sm text-gray-500">Create and manage column groups</p>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_1.5fr] gap-4 p-4 min-h-0">
        <GroupList 
          groups={groups}
          selectedGroupId={selectedGroup?.id}
          onGroupSelect={(group) => {
            setSelectedGroup(group);
            setMode('edit');
          }}
          onGroupDelete={deleteGroup}
        />
        <GroupForm
          mode={mode}
          availableColumns={getAvailableColumns()}
          selectedGroupColumns={selectedGroup?.columns || []}
          selectedGroup={selectedGroup}
          onSubmit={handleSubmit}
          onCancel={() => {
            setSelectedGroup(null);
            setMode('create');
          }}
        />
      </div>
    </div>
  );
};