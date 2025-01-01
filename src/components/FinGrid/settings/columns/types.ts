export interface ColumnNode {
  id: string;
  field?: string;
  headerName: string;
  children?: ColumnNode[];
  isGroup?: boolean;
  isExpanded?: boolean;
  parent?: ColumnNode;
  width?: number;
  hide?: boolean;
  sortable?: boolean;
  filter?: boolean | string;
  headerClass?: string;
  cellClass?: string;
  headerStyle?: Record<string, string>;
  cellStyle?: Record<string, string>;
  valueFormatter?: string;
  cellRenderer?: string;
  editable?: boolean;
}

export interface ColumnUpdate {
  id: string;
  changes: Partial<ColumnNode>;
}

export interface HeaderSettings {
  text: string;
  alignment: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: string;
}

export interface CellSettings {
  alignment: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: string;
}

export interface ValueFormatterSettings {
  type: 'number' | 'date' | 'text' | 'custom';
  format: string;
  params?: Record<string, any>;
}