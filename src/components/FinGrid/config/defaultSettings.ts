// Add default statusbar settings
export const DEFAULT_STATUS_BAR_COMPONENTS: StatusBarComponent[] = [
  { id: 'total', name: 'Total Rows', enabled: true },
  { id: 'filtered', name: 'Filtered Rows', enabled: false },
  { id: 'selected', name: 'Selected Rows', enabled: false }
];

export const DEFAULT_GRID_SETTINGS: GridSettings = {
  // ... existing settings ...
  
  statusBar: {
    show: true,
    position: 'bottom',
    components: DEFAULT_STATUS_BAR_COMPONENTS
  }
};