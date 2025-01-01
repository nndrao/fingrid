import React from 'react';
import { FinGrid } from './components/FinGrid';
import { Button } from './components/ui/button';
import { Download, Upload, Filter, Settings } from 'lucide-react';

// Sample column definitions with advanced features
const columnDefs = [
  { 
    field: 'symbol',
    headerName: 'Symbol',
    enableRowGroup: true,
    rowGroup: false,
    width: 120,
    filter: true
  },
  { 
    field: 'price',
    headerName: 'Price',
    enableValue: true,
    filter: 'agNumberColumnFilter',
    width: 120,
    valueFormatter: (params: any) => {
      return params.value ? `$${params.value.toFixed(2)}` : '';
    }
  },
  { 
    field: 'change',
    headerName: 'Change',
    enableValue: true,
    width: 120,
    cellRenderer: (params: any) => {
      const value = params.value;
      if (value === undefined || value === null) return '';
      const color = value >= 0 ? 'text-green-600' : 'text-red-600';
      return <span className={color}>{value > 0 ? '+' : ''}{value}%</span>;
    }
  },
  { 
    field: 'volume',
    headerName: 'Volume',
    enableValue: true,
    aggFunc: 'sum',
    filter: 'agNumberColumnFilter',
    width: 150,
    valueFormatter: (params: any) => {
      const value = params.value;
      if (value === undefined || value === null) return '';
      return value.toLocaleString();
    }
  }
];

// Enhanced sample data
const rowData = [
  { symbol: 'AAPL', price: 180.50, change: 2.5, volume: 1500000 },
  { symbol: 'GOOGL', price: 140.20, change: -1.2, volume: 800000 },
  { symbol: 'MSFT', price: 390.80, change: 1.8, volume: 1200000 },
  { symbol: 'AMZN', price: 175.20, change: -0.8, volume: 950000 },
  { symbol: 'META', price: 485.60, change: 3.2, volume: 1100000 },
  { symbol: 'TSLA', price: 210.30, change: -2.1, volume: 2100000 },
  { symbol: 'NVDA', price: 850.90, change: 4.5, volume: 1800000 },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto h-[800px]">
        <FinGrid
          title="Market Data Grid"
          columnDefs={columnDefs}
          rowData={rowData}
          showTopToolbar={true}
          showBottomToolbar={true}
          topToolbarContent={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          }
          bottomToolbarContent={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          }
          initialSettings={{
            theme: 'alpine',
            headerHeight: 45,
            rowHeight: 40,
            defaultColumnWidth: 150,
            enablePagination: true,
            pageSize: 100,
            enableRowHover: true,
            enableRangeSelection: true,
            enableMultiRowSelection: true,
            enableColumnDragging: true,
            enableCellTextSelection: true,
            showTopToolbar: true,
            showBottomToolbar: true,
            enableFilter: true,
            enableSort: true,
            enableResizing: true
          }}
          gridOptions={{
            suppressMenuHide: true,
            enableRangeSelection: true,
            enableCellTextSelection: true,
            rowSelection: 'multiple',
            groupDisplayType: 'multipleColumns',
            groupDefaultExpanded: 1,
            statusBar: {
              statusPanels: [
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agSelectedRowCountComponent', align: 'left' }
              ]
            },
            defaultColDef: {
              sortable: true,
              filter: true,
              resizable: true,
              floatingFilter: true
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;