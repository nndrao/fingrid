import { GridSettings } from '../types/gridSettings';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export function validateSettings(settings: Partial<GridSettings>): ValidationResult {
  const errors: Record<string, string[]> = {};

  // Validate column settings
  if (settings.columns) {
    const columnErrors: string[] = [];
    if (settings.columns.defaultWidth < 50 || settings.columns.defaultWidth > 500) {
      columnErrors.push('Default column width must be between 50 and 500 pixels');
    }
    if (columnErrors.length) {
      errors.columns = columnErrors;
    }
  }

  // Validate row settings
  if (settings.rows) {
    const rowErrors: string[] = [];
    if (settings.rows.height < 25 || settings.rows.height > 100) {
      rowErrors.push('Row height must be between 25 and 100 pixels');
    }
    if (settings.rows.headerHeight < 25 || settings.rows.headerHeight > 100) {
      rowErrors.push('Header height must be between 25 and 100 pixels');
    }
    if (rowErrors.length) {
      errors.rows = rowErrors;
    }
  }

  // Validate pagination settings
  if (settings.pagination) {
    const paginationErrors: string[] = [];
    if (settings.pagination.pageSize < 1) {
      paginationErrors.push('Page size must be greater than 0');
    }
    if (paginationErrors.length) {
      errors.pagination = paginationErrors;
    }
  }

  // Validate sidebar settings
  if (settings.sidebar) {
    const sidebarErrors: string[] = [];
    if (settings.sidebar.width < 150 || settings.sidebar.width > 500) {
      sidebarErrors.push('Sidebar width must be between 150 and 500 pixels');
    }
    if (sidebarErrors.length) {
      errors.sidebar = sidebarErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}