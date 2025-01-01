import React from 'react';
import { GeneralSettings } from '../../types';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface GridBehaviorProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
}

export const GridBehavior: React.FC<GridBehaviorProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Grid Behavior</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableRowSelection">Row Selection</Label>
            <p className="text-sm text-gray-500">Allow rows to be selected</p>
          </div>
          <Switch
            id="enableRowSelection"
            checked={settings.enableRowSelection}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableRowSelection: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableColumnResize">Column Resize</Label>
            <p className="text-sm text-gray-500">Allow columns to be resized</p>
          </div>
          <Switch
            id="enableColumnResize"
            checked={settings.enableColumnResize}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableColumnResize: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableSorting">Sorting</Label>
            <p className="text-sm text-gray-500">Enable column sorting</p>
          </div>
          <Switch
            id="enableSorting"
            checked={settings.enableSorting}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableSorting: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableFiltering">Filtering</Label>
            <p className="text-sm text-gray-500">Enable column filtering</p>
          </div>
          <Switch
            id="enableFiltering"
            checked={settings.enableFiltering}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enableFiltering: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enablePagination">Pagination</Label>
            <p className="text-sm text-gray-500">Enable grid pagination</p>
          </div>
          <Switch
            id="enablePagination"
            checked={settings.enablePagination}
            onCheckedChange={(checked) => 
              onSettingsChange({ ...settings, enablePagination: checked })
            }
          />
        </div>

        {settings.enablePagination && (
          <div className="space-y-2">
            <Label htmlFor="rowsPerPage">Rows per Page</Label>
            <Input
              id="rowsPerPage"
              type="number"
              min={1}
              value={settings.rowsPerPage}
              onChange={(e) => 
                onSettingsChange({ 
                  ...settings, 
                  rowsPerPage: parseInt(e.target.value) || 10 
                })
              }
              className="w-32"
            />
          </div>
        )}
      </div>
    </div>
  );
};