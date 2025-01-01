import React, { createContext, useContext, useState, useCallback } from 'react';
import { ColumnGroup } from '../types';

interface ColumnGroupsContextType {
  columnGroups: ColumnGroup[];
  updateColumnGroups: (groups: ColumnGroup[]) => void;
}

const ColumnGroupsContext = createContext<ColumnGroupsContextType | undefined>(undefined);

export function ColumnGroupsProvider({ children }: { children: React.ReactNode }) {
  const [columnGroups, setColumnGroups] = useState<ColumnGroup[]>([]);

  const updateColumnGroups = useCallback((groups: ColumnGroup[]) => {
    setColumnGroups(groups);
  }, []);

  return (
    <ColumnGroupsContext.Provider value={{ columnGroups, updateColumnGroups }}>
      {children}
    </ColumnGroupsContext.Provider>
  );
}

export function useColumnGroups() {
  const context = useContext(ColumnGroupsContext);
  if (!context) {
    throw new Error('useColumnGroups must be used within a ColumnGroupsProvider');
  }
  return context;
}