import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { FinGridHeader } from './FinGridHeader';
import { FinGridToolbar } from './FinGridToolbar';
import { FinGridSettings } from './FinGridSettings';
import { useGridSettings } from './hooks/useGridSettings';
import { useColumnGrouping } from './hooks/useColumnGrouping';
import { FinGridProps } from './types/props';
import { GridProvider, ColumnGroupsProvider } from './context';
import { logger } from './utils/logger';
import './styles/grid.css';

// Create an inner component to use the hooks after providers are mounted
const FinGridInner: React.FC<FinGridProps & {
  gridApi: GridApi | null;
  columnApi: ColumnApi | null;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  settings: any;
  updateSettings: (settings: any) => void;
  onGridReady: (params: any) => void;
}> = ({
  title,
  showTopToolbar = true,
  showBottomToolbar = true,
  topToolbarContent,
  bottomToolbarContent,
  columnDefs: initialColumnDefs,
  rowData: initialRowData,
  gridOptions = {},
  gridApi,
  columnApi,
  isSettingsOpen,
  setIsSettingsOpen,
  settings,
  updateSettings,
  onGridReady
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData] = useState<any[]>(initialRowData || []);

  const {
    columnDefs,
    groups,
    activeGroups,
    expandedGroups,
    availableColumns,
    allColumns
  } = useColumnGrouping(initialColumnDefs, gridApi);

  // Apply theme when settings change
  useEffect(() => {
    const gridDiv = gridRef.current?.eGridDiv;
    if (gridDiv && settings.theme) {
      const themeClass = `ag-theme-${settings.theme}`;
      gridDiv.className = `h-full w-full ${themeClass}`;
    }
  }, [settings.theme]);

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <FinGridHeader
        title={title}
        settings={settings}
        onSettingsChange={updateSettings}
        onSettingsClick={() => setIsSettingsOpen(true)}
        columns={allColumns}
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
            groupDisplayType="groupRows"
            suppressColumnMoveAnimation={false}
            animateRows={true}
            allowDragFromColumnsToolPanel={true}
            enableColumnMoveAnimation={true}
            maintainColumnOrder={true}
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
        columns={allColumns}
      />
    </div>
  );
};

// Main component that sets up providers
export const FinGrid: React.FC<FinGridProps> = (props) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { settings, updateSettings } = useGridSettings(gridApi, {
    ...props.initialSettings,
    showTopToolbar: props.showTopToolbar,
    showBottomToolbar: props.showBottomToolbar
  });

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <GridProvider gridApi={gridApi} columnApi={columnApi}>
      <ColumnGroupsProvider>
        <FinGridInner
          {...props}
          gridApi={gridApi}
          columnApi={columnApi}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          settings={settings}
          updateSettings={updateSettings}
          onGridReady={onGridReady}
        />
      </ColumnGroupsProvider>
    </GridProvider>
  );
};

export default FinGrid;