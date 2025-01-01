import React, { useState } from 'react';
import { ColumnGroup } from '../types';
import { GroupForm } from './GroupForm';

interface GroupsSectionProps {
  columns: string[];
  groups: ColumnGroup[];
  onGroupsChange: (groups: ColumnGroup[]) => void;
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({
  columns,
  groups,
  onGroupsChange,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<ColumnGroup | null>(null);

  return (
    <div className="p-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Column Groups</h2>
        <p className="text-sm text-gray-500">Create and manage column groups to organize your data</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Left Column - Existing Groups */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Existing Groups</h3>
          {groups.length === 0 ? (
            <p className="text-sm text-gray-500">No groups created yet</p>
          ) : (
            <div className="space-y-2">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedGroup(group)}
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

        {/* Right Column - Group Form */}
        <div className="border rounded-lg p-4">
          <GroupForm
            columns={columns}
            selectedGroup={selectedGroup}
            onSubmit={(group) => {
              if (selectedGroup) {
                const updatedGroups = groups.map(g => 
                  g.name === selectedGroup.name ? group : g
                );
                onGroupsChange(updatedGroups);
              } else {
                onGroupsChange([...groups, group]);
              }
              setSelectedGroup(null);
            }}
            onCancel={() => setSelectedGroup(null)}
          />
        </div>
      </div>
    </div>
  );
};