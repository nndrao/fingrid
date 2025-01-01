// Update the renderContent function:
const renderContent = () => {
  switch (activeTab) {
    // ... other cases ...
    case 'data':
      return (
        <DataSection
          initialData={settings.dataSource}
          onSubmit={(dataSource) => onSettingsChange({ ...settings, dataSource })}
        />
      );
    // ... other cases ...
  }
};