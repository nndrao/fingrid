import React, { useState, useCallback } from 'react';
import { GroupList } from './components/GroupList';
import { GroupForm } from './components/GroupForm';
import { ColumnGroup, GeneralSettings } from '../../types';
import { generateId } from '../../utils/generateId';
import { useColumnGroups } from '../../context/ColumnGroupsContext';

interface GroupsSectionProps {
  columns: string[];
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({
  columns,
  settings,
  onSettingsChange,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<ColumnGroup | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const { updateColumnGroups } = useColumnGroups();

  const getAvailableColumns = useCallback(() => {
    const usedColumns = settings.columnGroups?.flatMap(group => 
      group.id !== selectedGroup?.id ? group.columns : []
    ) || [];
    return columns.filter(col => !usedColumns.includes(col));
  }, [columns, settings.columnGroups, selectedGroup]);

  const handleCreateGroup = (group: Omit<ColumnGroup, 'id'>) => {
    const newGroup = { ...group, id: generateId() };
    const updatedGroups = [...(settings.columnGroups || []), newGroup];
    
    onSettingsChange({
      ...settings,
      columnGroups: updatedGroups
    });
    updateColumnGroups(updatedGroups);
    
    setMode('create');
    setSelectedGroup(null);
  };

  const handleUpdateGroup = (group: ColumnGroup) => {
    const updatedGroups = (settings.columnGroups || []).map(g => 
      g.id === group.id ? group : g
    );
    
    onSettingsChange({
      ...settings,
      columnGroups: updatedGroups
    });
    updateColumnGroups(updatedGroups);
    
    setSelectedGroup(null);
    setMode('create');
  };

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = (settings.columnGroups || []).filter(g => g.id !== groupId);
    
    onSettingsChange({
      ...settings,
      columnGroups: updatedGroups
    });
    updateColumnGroups(updatedGroups);
    
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
      setMode('create');
    }
  };

  const handleSubmit = (group: Omit<ColumnGroup, 'id'> & { id?: string }) => {
    if (mode === 'edit' && group.id) {
      handleUpdateGroup(group as ColumnGroup);
    } else {
      handleCreateGroup(group);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b bg-gray-50/80">
        <h2 className="text-lg font-semibold">Column Groups</h2>
        <p className="text-sm text-gray-500">Create and manage column groups</p>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_1.5fr] gap-4 p-4 min-h-0">
        <GroupList 
          groups={settings.columnGroups || []}
          selectedGroupId={selectedGroup?.id}
          onGroupSelect={(group) => {
            setSelectedGroup(group);
            setMode('edit');
          }}
          onGroupDelete={handleDeleteGroup}
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