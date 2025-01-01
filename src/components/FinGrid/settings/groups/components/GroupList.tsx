import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnGroup } from '../../../types';
import { cn } from '@/lib/utils';

interface GroupListProps {
  groups: ColumnGroup[];
  selectedGroupId: string | undefined;
  onGroupSelect: (group: ColumnGroup) => void;
  onGroupDelete: (groupId: string) => void;
}

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  selectedGroupId,
  onGroupSelect,
  onGroupDelete,
}) => {
  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      <div className="p-4 border-b">
        <h3 className="font-medium">Existing Groups</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {groups.length === 0 ? (
          <p className="text-sm text-gray-500">No groups created yet</p>
        ) : (
          <div className="space-y-2">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => onGroupSelect(group)}
                className={cn(
                  "group p-3 rounded-lg transition-colors cursor-pointer",
                  selectedGroupId === group.id 
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">
                    {group.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this group?')) {
                        onGroupDelete(group.id);
                      }
                    }}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  {group.columns.length} column{group.columns.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};