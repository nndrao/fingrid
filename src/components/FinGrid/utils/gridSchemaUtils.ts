import { ColDef } from 'ag-grid-community';

interface FieldInfo {
  type: string;
  sample: any;
}

function inferFieldType(value: any): FieldInfo {
  if (value === null || value === undefined) {
    return { type: 'string', sample: null };
  }

  switch (typeof value) {
    case 'number':
      return {
        type: Number.isInteger(value) ? 'integer' : 'number',
        sample: value
      };
    case 'boolean':
      return { type: 'boolean', sample: value };
    case 'string':
      // Check if string is a date
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return { type: 'date', sample: date };
      }
      return { type: 'string', sample: value };
    case 'object':
      if (Array.isArray(value)) {
        return { type: 'array', sample: value };
      }
      if (value instanceof Date) {
        return { type: 'date', sample: value };
      }
      return { type: 'object', sample: value };
    default:
      return { type: 'string', sample: String(value) };
  }
}

function formatHeaderName(field: string): string {
  return field
    .split(/(?=[A-Z])|[_\s-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getDefaultColumnConfig(fieldInfo: FieldInfo): Partial<ColDef> {
  const baseConfig: Partial<ColDef> = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  switch (fieldInfo.type) {
    case 'number':
    case 'integer':
      return {
        ...baseConfig,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) => {
          if (params.value == null) return '';
          return params.value.toLocaleString();
        }
      };

    case 'boolean':
      return {
        ...baseConfig,
        filter: 'agSetColumnFilter',
        cellRenderer: (params: any) => {
          if (params.value == null) return '';
          return params.value ? 'Yes' : 'No';
        }
      };

    case 'date':
      return {
        ...baseConfig,
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          if (params.value == null) return '';
          return new Date(params.value).toLocaleDateString();
        }
      };

    default:
      return baseConfig;
  }
}

export function generateColumnDefs(data: any[]): ColDef[] {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Get sample record for type inference
  const sampleRecord = data[0];
  
  return Object.keys(sampleRecord).map(field => {
    const fieldInfo = inferFieldType(sampleRecord[field]);
    
    return {
      field,
      headerName: formatHeaderName(field),
      ...getDefaultColumnConfig(fieldInfo)
    };
  });
}