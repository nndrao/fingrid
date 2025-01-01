import React from 'react';
import { Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FinGridSettings } from './FinGridSettings';
import { SettingsPopup } from './SettingsPopup';
import { GeneralSettings } from './types/settings';

interface FinGridHeaderProps {
  title?: string;
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
  onSettingsClick: () => void;
  columns: string[];
  isSettingsOpen: boolean;
  onSettingsOpenChange: (open: boolean) => void;
}

export const FinGridHeader: React.FC<FinGridHeaderProps> = ({
  title,
  settings,
  onSettingsChange,
  onSettingsClick,
  columns,
  isSettingsOpen,
  onSettingsOpenChange
}) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-xl font-semibold">{title || settings.title}</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          title="Open settings dialog"
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPopupOpen(true)}
          title="Open settings in new window"
        >
          <ExternalLink className="w-5 h-5" />
        </Button>
      </div>

      <FinGridSettings
        open={isSettingsOpen}
        onOpenChange={onSettingsOpenChange}
        settings={settings}
        onSettingsChange={onSettingsChange}
        columns={columns}
      />

      {isPopupOpen && (
        <SettingsPopup
          settings={settings}
          onSettingsChange={onSettingsChange}
          onClose={() => setIsPopupOpen(false)}
          columns={columns}
        />
      )}
    </div>
  );
};