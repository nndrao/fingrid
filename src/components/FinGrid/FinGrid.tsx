import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { FinGridHeader } from './FinGridHeader';
import { FinGridToolbar } from './FinGridToolbar';
import { FinGridSettings } from './FinGridSettings';
import { useGridSettings } from './hooks/useGridSettings';
import { FinGridProps } from './types/props';
import { GridProvider, ColumnGroupsProvider } from './context';
import { logger } from './utils/logger';
import './styles/grid.css';

export const FinGrid: React.FC<FinGridProps> = ({
  title,
  showTopToolbar = true,
  showBottomToolbar = true,
  topToolbarContent,
  bottomToolbarContent,
  columnDefs: initialColumnDefs,
  rowData: initialRowData,
  gridOptions = {},
  initialSettings = {}
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { settings, updateSettings } = useGridSettings(gridApi, {
    ...initialSettings,
    showTopToolbar,
    showBottomToolbar
  });

  const [columnDefs] = useState(initialColumnDefs);
  const [rowData] = useState<any[]>(initialRowData || []);

  // Apply theme when settings change
  useEffect(() => {
    const gridDiv = gridRef.current?.eGridDiv;
    if (gridDiv && settings.theme) {
      const themeClass = `ag-theme-${settings.theme}`;
      gridDiv.className = `h-full w-full ${themeClass}`;
    }
  }, [settings.theme]);

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <GridProvider gridApi={gridApi} columnApi={columnApi}>
      <ColumnGroupsProvider>
        <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
          <FinGridHeader
            title={title}
            settings={settings}
            onSettingsChange={updateSettings}
            onSettingsClick={() => setIsSettingsOpen(true)}
            columns={columnDefs.map(col => col.field || '')}
            isSettingsOpen={isSettingsOpen}
            onSettingsOpenChange={setIsSettingsOpen}
          />

          {settings.showTopToolbar && topToolbarContent && (
            <FinGridToolbar>{topToolbarContent}</FinGridToolbar>
          )}

          <div className="flex-1 w-full min-h-[500px]">
            <div className={`h-full w-full ag-theme-${settings.theme || 'alpine'}`}>
              <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={onGridReady}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  resizable: true,
                  flex: 1,
                  minWidth: 100
                }}
                domLayout="normal"
                {...gridOptions}
              />
            </div>
          </div>

          {settings.showBottomToolbar && bottomToolbarContent && (
            <FinGridToolbar>{bottomToolbarContent}</FinGridToolbar>
          )}

          <FinGridSettings
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            settings={settings}
            onSettingsChange={updateSettings}
            columns={columnDefs.map(col => col.field || '')}
          />
        </div>
      </ColumnGroupsProvider>
    </GridProvider>
  );
};