import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnGroup } from '../../types';

interface ExistingGroupsProps {
  groups: ColumnGroup[];
  onGroupsChange: (groups: ColumnGroup[]) => void;
}

export const ExistingGroups: React.FC<ExistingGroupsProps> = ({
  groups,
  onGroupsChange,
}) => {
  const handleDeleteGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    onGroupsChange(newGroups);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Column Groups</h2>
        <p className="text-sm text-gray-500">Create and manage column groups to organize your data</p>
      </div>

      <div className="border rounded-lg">
        {groups.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No groups created yet</p>
          </div>
        ) : (
          <div className="divide-y">
            {groups.map((group, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{group.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGroup(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">{group.columns.length} columns</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};