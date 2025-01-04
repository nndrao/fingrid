import { ColDef, ColGroupDef } from 'ag-grid-community';

export interface ColumnGroup {
  id: string;
  name: string;
  columns: string[];
  expanded?: boolean;
  isEditing?: boolean;
}

export interface ColumnGroupState {
  groups: ColumnGroup[];
  activeGroups: string[];
  expandedGroups: string[];
  editingGroupId: string | null;
  selectedColumns: string[];
  mode: 'create' | 'edit';
}

export const DEFAULT_COLUMN_GROUP_STATE: ColumnGroupState = {
  groups: [],
  activeGroups: [],
  expandedGroups: [],
  editingGroupId: null,
  selectedColumns: [],
  mode: 'create'
}; 