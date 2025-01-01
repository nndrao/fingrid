import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FinGridSettings } from './FinGridSettings';
import { GeneralSettings } from './types';

interface SettingsPopupProps {
  settings: GeneralSettings;
  onSettingsChange: (settings: GeneralSettings) => void;
  onClose: () => void;
}

export const SettingsPopup: React.FC<SettingsPopupProps> = ({
  settings,
  onSettingsChange,
  onClose,
}) => {
  const [container] = React.useState(() => {
    const popup = window.open('', 'Grid Settings', 'width=1100,height=800');
    if (popup) {
      // Get all stylesheets from the parent window
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            // Handle cross-origin stylesheets
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = sheet.href || '';
            return link.outerHTML;
          }
        })
        .filter(Boolean)
        .join('\n');

      popup.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Grid Settings</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>${styles}</style>
          </head>
          <body class="bg-background">
            <div id="settings-root"></div>
          </body>
        </html>
      `);
      popup.document.close();
    }
    return popup?.document.getElementById('settings-root');
  });

  useEffect(() => {
    const popup = container?.ownerDocument.defaultView;
    
    const handleUnload = () => {
      onClose();
    };

    popup?.addEventListener('unload', handleUnload);
    
    return () => {
      popup?.removeEventListener('unload', handleUnload);
      popup?.close();
    };
  }, [container, onClose]);

  if (!container) return null;

  return createPortal(
    <div className="min-h-screen bg-background p-6">
      <FinGridSettings
        open={true}
        onOpenChange={() => onClose()}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
    </div>,
    container
  );
};