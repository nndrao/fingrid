import React, { useState } from 'react';
import { ColumnGroup } from '../../types';
import { GroupList } from './GroupList';
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
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Column Groups</h2>
        <p className="text-sm text-gray-500">Create and manage column groups to organize your data</p>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_1.5fr] gap-4 p-4 min-h-0">
        <div className="flex flex-col min-h-0">
          <GroupList 
            groups={groups} 
            onGroupSelect={setSelectedGroup} 
          />
        </div>
        
        <div className="flex flex-col min-h-0">
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