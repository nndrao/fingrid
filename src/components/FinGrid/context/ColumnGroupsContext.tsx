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

  // Group Management
  const addGroup = useCallback((group: Omit<ColumnGroup, 'id'>) => {
    setState(prev => {
      const newGroup = {
        ...group,
        id: generateId(),
        expanded: true
      };
      return {
        ...prev,
        groups: [...prev.groups, newGroup],
        activeGroups: [...prev.activeGroups, newGroup.id],
        selectedColumns: [],
        mode: 'create' as const
      };
    });
  }, []);

  const updateGroup = useCallback((id: string, updates: Partial<ColumnGroup>) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(group => 
        group.id === id ? { ...group, ...updates } : group
      ),
      editingGroupId: null,
      selectedColumns: [],
      mode: 'create' as const
    }));
  }, []);

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
      selectedColumns: Array.from(new Set([...prev.selectedColumns, ...columns]))
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
    setState(prev => {
      const group = prev.groups.find(g => g.id === id);
      return {
        ...prev,
        editingGroupId: id,
        selectedColumns: group?.columns || [],
        mode: 'edit' as const
      };
    });
  }, []);

  const cancelEditingGroup = useCallback(() => {
    setState(prev => ({
      ...prev,
      editingGroupId: null,
      selectedColumns: [],
      mode: 'create' as const
    }));
  }, []);

  // Group State Management
  const toggleGroupActive = useCallback((id: string) => {
    setState(prev => {
      const isActive = prev.activeGroups.includes(id);
      return {
        ...prev,
        activeGroups: isActive
          ? prev.activeGroups.filter(groupId => groupId !== id)
          : [...prev.activeGroups, id]
      };
    });
  }, []);

  const toggleGroupExpanded = useCallback((id: string) => {
    setState(prev => {
      const isExpanded = prev.expandedGroups.includes(id);
      return {
        ...prev,
        expandedGroups: isExpanded
          ? prev.expandedGroups.filter(groupId => groupId !== id)
          : [...prev.expandedGroups, id],
        groups: prev.groups.map(group =>
          group.id === id ? { ...group, expanded: !isExpanded } : group
        )
      };
    });
  }, []);

  // Validation
  const isGroupNameValid = useCallback((name: string, excludeGroupId?: string) => {
    return (
      name.trim().length > 0 &&
      !state.groups.some(group => 
        group.id !== excludeGroupId && 
        group.name.toLowerCase() === name.trim().toLowerCase()
      )
    );
  }, [state.groups]);

  const getAvailableColumns = useCallback((allColumns: string[], excludeGroupId?: string) => {
    const usedColumns = new Set<string>();
    state.groups.forEach(group => {
      if (group.id !== excludeGroupId) {
        group.columns.forEach(col => usedColumns.add(col));
      }
    });
    return allColumns.filter(col => !usedColumns.has(col));
  }, [state.groups]);

  return (
    <ColumnGroupsContext.Provider
      value={{
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
        getAvailableColumns
      }}
    >
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