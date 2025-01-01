import React from 'react';
import { ColumnGroup } from '../../types';

interface GroupListProps {
  groups: ColumnGroup[];
  onGroupSelect: (group: ColumnGroup) => void;
}

export const GroupList: React.FC<GroupListProps> = ({ groups, onGroupSelect }) => {
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
            {groups.map((group, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onGroupSelect(group)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{group.name}</h4>
                  <span className="text-sm text-gray-500">{group.columns.length} columns</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};