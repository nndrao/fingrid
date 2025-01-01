export type GridTheme = {
  value: string;
  label: string;
  class: string;
};

export const GRID_THEMES: GridTheme[] = [
  { value: 'alpine', label: 'Alpine', class: 'ag-theme-alpine' },
  { value: 'alpine-dark', label: 'Alpine Dark', class: 'ag-theme-alpine-dark' },
  { value: 'balham', label: 'Balham', class: 'ag-theme-balham' },
  { value: 'balham-dark', label: 'Balham Dark', class: 'ag-theme-balham-dark' },
  { value: 'material', label: 'Material', class: 'ag-theme-material' }
];