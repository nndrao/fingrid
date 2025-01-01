import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SettingsNav } from './settings/SettingsNav';
import { GeneralSection } from './settings/general/GeneralSection';
import { ColumnsSection } from './settings/columns/ColumnsSection';
import { GroupsSection } from './settings/groups/GroupsSection';
import { StylingSection } from './settings/styling/StylingSection';
import { FiltersSection } from './settings/filters/FiltersSection';
import { DataSection } from './settings/data/DataSection';
import { SecuritySection } from './settings/security/SecuritySection';
import { GeneralSettings } from './types';

interface FinGridSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
  columns: string[];
}

export const FinGridSettings: React.FC<FinGridSettingsProps> = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  columns,
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [tempSettings, setTempSettings] = useState<GeneralSettings>(settings);

  useEffect(() => {
    if (open) {
      setTempSettings(settings);
    }
  }, [open, settings]);

  const handleApply = () => {
    onSettingsChange(tempSettings);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSection 
            settings={tempSettings}
            onSettingsChange={setTempSettings}
          />
        );
      case 'columns':
        return <ColumnsSection columns={columns} />;
      case 'groups':
        return (
          <GroupsSection 
            columns={columns}
            settings={tempSettings}
            onSettingsChange={setTempSettings}
          />
        );
      case 'styling':
        return <StylingSection />;
      case 'filters':
        return <FiltersSection />;
      case 'data':
        return (
          <DataSection
            initialData={tempSettings.dataSource}
            onSettingsChange={(dataSource) => setTempSettings({ ...tempSettings, dataSource })}
          />
        );
      case 'security':
        return <SecuritySection />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1100px] p-0">
        <DialogHeader className="px-4 py-2 border-b">
          <DialogTitle>Grid Settings</DialogTitle>
          <DialogDescription>
            Configure grid appearance, behavior, and data sources
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-[640px] overflow-hidden flex">
          <SettingsNav 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex-1 overflow-hidden">
            {renderContent()}
          </div>
        </div>

        <DialogFooter className="px-4 py-3 border-t bg-gray-50">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
            >
              Apply Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};