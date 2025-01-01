import { Database, Settings2, LayoutGrid, Paintbrush, Filter, Users, Lock, Group } from 'lucide-react';

export type SettingsTab = {
  id: string;
  label: string;
  icon: typeof Database;
};

export const SETTINGS_TABS: SettingsTab[] = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'columns', label: 'Columns', icon: LayoutGrid },
  { id: 'groups', label: 'Groups', icon: Group },
  { id: 'styling', label: 'Styling', icon: Paintbrush },
  { id: 'filters', label: 'Filters', icon: Filter },
  { id: 'data', label: 'Data Source', icon: Database },
  { id: 'security', label: 'Security', icon: Lock },
];