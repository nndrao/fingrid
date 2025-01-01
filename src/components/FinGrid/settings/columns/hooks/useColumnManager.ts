import { useCallback, useEffect, useState } from 'react';
import { ColumnNode, ColumnUpdate } from '../types';
import { useGridContext } from '../../../context/GridContext';
import { useColumnGroups } from '../../../context/ColumnGroupsContext';
import { buildColumnTree } from '../../../utils/columnTreeBuilder';
import { applyColumnUpdate } from '../../../utils/columnUpdater';

export function useColumnManager() {
  const { gridApi, columnApi } = useGridContext();
  const { columnGroups } = useColumnGroups();
  const [columnTree, setColumnTree] = useState<ColumnNode[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<ColumnNode | null>(null);

  // Update column tree when column groups change
  useEffect(() => {
    if (!gridApi || !columnApi) return;

    const handleGridUpdate = () => {
      const tree = buildColumnTree(columnApi.getAllGridColumns(), columnGroups);
      setColumnTree(tree);
    };

    handleGridUpdate();

    gridApi.addEventListener('gridReady', handleGridUpdate);
    gridApi.addEventListener('columnVisible', handleGridUpdate);
    gridApi.addEventListener('columnMoved', handleGridUpdate);
    gridApi.addEventListener('columnGroupOpened', handleGridUpdate);
    gridApi.addEventListener('newColumnsLoaded', handleGridUpdate);

    return () => {
      gridApi.removeEventListener('gridReady', handleGridUpdate);
      gridApi.removeEventListener('columnVisible', handleGridUpdate);
      gridApi.removeEventListener('columnMoved', handleGridUpdate);
      gridApi.removeEventListener('columnGroupOpened', handleGridUpdate);
      gridApi.removeEventListener('newColumnsLoaded', handleGridUpdate);
    };
  }, [gridApi, columnApi, columnGroups]);

  const handleColumnSelect = useCallback((columnId: string) => {
    const findColumn = (nodes: ColumnNode[]): ColumnNode | null => {
      for (const node of nodes) {
        if (node.id === columnId) return node;
        if (node.children) {
          const found = findColumn(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const column = findColumn(columnTree);
    setSelectedColumn(column);
  }, [columnTree]);

  const handleColumnUpdate = useCallback((update: ColumnUpdate) => {
    if (!gridApi || !columnApi) return;
    applyColumnUpdate(update, gridApi, columnApi);
  }, [gridApi, columnApi]);

  const handleColumnMove = useCallback((sourceId: string, targetId: string, position: 'before' | 'after' | 'child') => {
    if (!columnApi) return;
    columnApi.moveColumn(sourceId, targetId, position === 'after' ? 1 : 0);
  }, [columnApi]);

  const handleGroupToggle = useCallback((columnId: string) => {
    if (!columnApi) return;
    const column = columnApi.getColumn(columnId);
    if (!column) return;
    columnApi.setColumnGroupOpened(columnId, !column.isExpanded());
  }, [columnApi]);

  return {
    columnTree,
    selectedColumn,
    handleColumnSelect,
    handleColumnUpdate,
    handleColumnMove,
    handleGroupToggle,
  };
}