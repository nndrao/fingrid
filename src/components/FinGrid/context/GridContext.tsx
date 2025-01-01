import React, { createContext, useContext } from 'react';
import { GridApi, ColumnApi } from 'ag-grid-community';

interface GridContextType {
  gridApi: GridApi | null;
  columnApi: ColumnApi | null;
}

const GridContext = createContext<GridContextType>({
  gridApi: null,
  columnApi: null,
});

export const GridProvider: React.FC<GridContextType & { children: React.ReactNode }> = ({ 
  gridApi, 
  columnApi, 
  children 
}) => {
  return (
    <GridContext.Provider value={{ gridApi, columnApi }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGridContext must be used within a GridProvider');
  }
  return context;
};