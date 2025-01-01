import React from 'react';
import { ChevronRight, ChevronDown, GripVertical } from 'lucide-react';
import { ColumnNode } from '../types';
import { cn } from '@/lib/utils';

interface ColumnTreeProps {
  columns: ColumnNode[];
  selectedColumnId?: string;
  onColumnSelect: (columnId: string) => void;
  onColumnMove: (sourceId: string, targetId: string, position: 'before' | 'after' | 'child') => void;
  onGroupToggle: (columnId: string) => void;
  level?: number;
}

export const ColumnTree: React.FC<ColumnTreeProps> = ({
  columns,
  selectedColumnId,
  onColumnSelect,
  onColumnMove,
  onGroupToggle,
  level = 0,
}) => {
  const renderTreeLine = (isLast: boolean) => {
    if (level === 0) return null;
    
    return (
      <div 
        className="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-gray-200"
        style={{ 
          left: `${(level * 20) - 12}px`,
          height: isLast ? '24px' : '100%'
        }}
      />
    );
  };

  const renderBranchLine = () => {
    if (level === 0) return null;

    return (
      <div 
        className="absolute border-t-2 border-dashed border-gray-200"
        style={{ 
          left: `${(level * 20) - 12}px`,
          width: '12px',
          top: '12px'
        }}
      />
    );
  };

  return (
    <div className="space-y-1">
      {columns.map((column, index) => (
        <div key={column.id} className="relative">
          {renderTreeLine(index === columns.length - 1)}
          {renderBranchLine()}
          
          <div
            className={cn(
              'flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 relative',
              selectedColumnId === column.id && 'bg-blue-50 hover:bg-blue-100',
              column.hide && 'opacity-50'
            )}
            style={{ paddingLeft: `${(level * 20) + 8}px` }}
            onClick={() => onColumnSelect(column.id)}
          >
            <GripVertical 
              className="w-4 h-4 text-gray-400 cursor-move hover:text-gray-600" 
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('columnId', column.id);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('text-blue-500');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('text-blue-500');
              }}
              onDrop={(e) => {
                e.preventDefault();
                const sourceId = e.dataTransfer.getData('columnId');
                if (sourceId !== column.id) {
                  onColumnMove(sourceId, column.id, 'before');
                }
                e.currentTarget.classList.remove('text-blue-500');
              }}
            />
            
            {column.isGroup ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGroupToggle(column.id);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {column.isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <div className="w-6" /> // Spacer for alignment
            )}
            
            <span className="flex-1 truncate">
              {column.headerName || column.field}
            </span>

            {column.hide && (
              <span className="text-xs text-gray-400 italic">Hidden</span>
            )}
          </div>

          {column.children && column.isExpanded && (
            <ColumnTree
              columns={column.children}
              selectedColumnId={selectedColumnId}
              onColumnSelect={onColumnSelect}
              onColumnMove={onColumnMove}
              onGroupToggle={onGroupToggle}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};