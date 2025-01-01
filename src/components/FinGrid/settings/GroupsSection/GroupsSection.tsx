import React from 'react';
import { ExistingGroups } from './ExistingGroups';
import { CreateGroupForm } from './CreateGroupForm';
import { ColumnGroup } from '../../types';

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
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <ExistingGroups 
        groups={groups} 
        onGroupsChange={onGroupsChange}
      />
      <CreateGroupForm 
        columns={columns}
        onGroupCreate={(newGroup) => {
          onGroupsChange([...groups, newGroup]);
        }}
      />
    </div>
  );
};