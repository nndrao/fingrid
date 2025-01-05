import React, { createContext, useContext, useState, useCallback } from 'react';
import { ColumnGroup, ColumnGroupState, DEFAULT_COLUMN_GROUP_STATE } from '../types/columnGroup';
import { generateId } from '../utils/generateId';

interface ColumnGroupsContextType {
  state: ColumnGroupState;
  // Group Management
  addGroup: (group: Omit<ColumnGroup, 'id'>) => void;
  updateGroup: (id: string, updates: Partial<ColumnGroup>) => void;
  deleteGroup: (id: string) => void;
  // Selection Management
  selectColumns: (columns: string[]) => void;
  deselectColumns: (columns: string[]) => void;
  clearSelectedColumns: () => void;
  // Mode Management
  startEditingGroup: (id: string) => void;
  cancelEditingGroup: () => void;
  // Group State Management
  toggleGroupActive: (id: string) => void;
  toggleGroupExpanded: (id: string) => void;
  // Validation
  isGroupNameValid: (name: string, excludeGroupId?: string) => boolean;
  getAvailableColumns: (allColumns: string[], excludeGroupId?: string) => string[];
}

const ColumnGroupsContext = createContext<ColumnGroupsContextType | undefined>(undefined);

export const ColumnGroupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ColumnGroupState>(DEFAULT_COLUMN_GROUP_STATE);

  // Validation
  const isGroupNameValid = useCallback((name: string, excludeGroupId?: string) => {
    if (!name || typeof name !== 'string') return false;
    const trimmedName = name.trim();
    return (
      trimmedName.length > 0 &&
      !state.groups.some(group => 
        group.id !== excludeGroupId && 
        group.name.toLowerCase() === trimmedName.toLowerCase()
      )
    );
  }, [state.groups]);

  // Group Management
  const addGroup = useCallback((group: Omit<ColumnGroup, 'id'>) => {
    if (!group.name || typeof group.name !== 'string') {
      console.error('Invalid group name');
      return;
    }

    const trimmedName = group.name.trim();
    if (!isGroupNameValid(trimmedName)) {
      console.error('Group name is invalid or already exists');
      return;
    }

    setState(prev => {
      // Create new group with unique ID
      const newGroup = {
        ...group,
        name: trimmedName,
        id: generateId(),
        expanded: true,
        columns: [...new Set(group.columns)] // Ensure unique columns
      };

      // Remove any columns that are already in other groups
      const usedColumns = new Set<string>();
      prev.groups.forEach(existingGroup => {
        existingGroup.columns.forEach(col => usedColumns.add(col));
      });

      newGroup.columns = newGroup.columns.filter(col => !usedColumns.has(col));

      // Only add the group if it has columns
      if (newGroup.columns.length === 0) {
        console.error('No available columns for the group');
        return prev;
      }

      return {
        ...prev,
        groups: [...prev.groups, newGroup],
        activeGroups: [...prev.activeGroups, newGroup.id],
        selectedColumns: [],
        mode: 'create' as const
      };
    });
  }, [isGroupNameValid]);

  const updateGroup = useCallback((id: string, updates: Partial<ColumnGroup>) => {
    if (updates.name && !isGroupNameValid(updates.name, id)) {
      console.error('Group name is invalid or already exists');
      return;
    }

    setState(prev => {
      // Get the existing group
      const existingGroup = prev.groups.find(g => g.id === id);
      if (!existingGroup) {
        console.error('Group not found');
        return prev;
      }

      // Create the updated group
      const updatedGroup = {
        ...existingGroup,
        ...updates,
        name: updates.name ? updates.name.trim() : existingGroup.name,
        columns: updates.columns ? [...new Set(updates.columns)] : existingGroup.columns // Ensure unique columns
      };

      // Remove any columns that are already in other groups
      if (updates.columns) {
        const usedColumns = new Set<string>();
        prev.groups.forEach(group => {
          if (group.id !== id) { // Skip the current group
            group.columns.forEach(col => usedColumns.add(col));
          }
        });

        updatedGroup.columns = updatedGroup.columns.filter(col => !usedColumns.has(col));
      }

      // Update only the target group, keeping all other groups unchanged
      return {
        ...prev,
        groups: prev.groups.map(group => 
          group.id === id ? updatedGroup : group
        ),
        editingGroupId: null,
        selectedColumns: [],
        mode: 'create' as const
      };
    });
  }, [isGroupNameValid]);

  const deleteGroup = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.filter(group => group.id !== id),
      activeGroups: prev.activeGroups.filter(groupId => groupId !== id),
      expandedGroups: prev.expandedGroups.filter(groupId => groupId !== id),
      editingGroupId: prev.editingGroupId === id ? null : prev.editingGroupId,
      selectedColumns: prev.editingGroupId === id ? [] : prev.selectedColumns,
      mode: prev.editingGroupId === id ? 'create' : prev.mode
    }));
  }, []);

  // Selection Management
  const selectColumns = useCallback((columns: string[]) => {
    setState(prev => ({
      ...prev,
      selectedColumns: [...new Set([...prev.selectedColumns, ...columns])]
    }));
  }, []);

  const deselectColumns = useCallback((columns: string[]) => {
    setState(prev => ({
      ...prev,
      selectedColumns: prev.selectedColumns.filter(col => !columns.includes(col))
    }));
  }, []);

  const clearSelectedColumns = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedColumns: []
    }));
  }, []);

  // Mode Management
  const startEditingGroup = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      editingGroupId: id,
      mode: 'edit'
    }));
  }, []);

  const cancelEditingGroup = useCallback(() => {
    setState(prev => ({
      ...prev,
      editingGroupId: null,
      mode: 'create'
    }));
  }, []);

  // Group State Management
  const toggleGroupActive = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      activeGroups: prev.activeGroups.includes(id)
        ? prev.activeGroups.filter(groupId => groupId !== id)
        : [...prev.activeGroups, id]
    }));
  }, []);

  const toggleGroupExpanded = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      expandedGroups: prev.expandedGroups.includes(id)
        ? prev.expandedGroups.filter(groupId => groupId !== id)
        : [...prev.expandedGroups, id]
    }));
  }, []);

  // Get available columns
  const getAvailableColumns = useCallback((allColumns: string[], excludeGroupId?: string) => {
    const usedColumns = new Set<string>();
    state.groups.forEach(group => {
      if (group.id !== excludeGroupId) {
        group.columns.forEach(col => usedColumns.add(col));
      }
    });
    return allColumns.filter(col => !usedColumns.has(col));
  }, [state.groups]);

  const value = {
    state,
    addGroup,
    updateGroup,
    deleteGroup,
    selectColumns,
    deselectColumns,
    clearSelectedColumns,
    startEditingGroup,
    cancelEditingGroup,
    toggleGroupActive,
    toggleGroupExpanded,
    isGroupNameValid,
    getAvailableColumns,
  };

  return (
    <ColumnGroupsContext.Provider value={value}>
      {children}
    </ColumnGroupsContext.Provider>
  );
};

export const useColumnGroups = () => {
  const context = useContext(ColumnGroupsContext);
  if (!context) {
    throw new Error('useColumnGroups must be used within a ColumnGroupsProvider');
  }
  return context;
};