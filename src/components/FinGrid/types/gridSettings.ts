// Add StatusBar types
export interface StatusBarComponent {
  id: string;
  name: string;
  enabled: boolean;
}

export interface StatusBarSettings {
  show: boolean;
  position: 'top' | 'bottom';
  components: StatusBarComponent[];
}

export interface GridSettings {
  // ... existing settings ...
  statusBar: StatusBarSettings;
}