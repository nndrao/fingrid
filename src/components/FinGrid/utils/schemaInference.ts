interface SchemaField {
  name: string;
  type: string;
  sample: any;
}

interface Schema {
  fields: SchemaField[];
}

function inferFieldType(value: any): string {
  if (value === null || value === undefined) return 'string';
  
  switch (typeof value) {
    case 'number':
      return Number.isInteger(value) ? 'integer' : 'number';
    case 'boolean':
      return 'boolean';
    case 'string':
      // Check if string is a date
      if (!isNaN(Date.parse(value))) return 'date';
      return 'string';
    case 'object':
      if (Array.isArray(value)) return 'array';
      if (value instanceof Date) return 'date';
      return 'object';
    default:
      return 'string';
  }
}

export function inferSchema(data: any[]): Schema {
  if (!Array.isArray(data) || data.length === 0) {
    return { fields: [] };
  }

  // Get all unique keys from all objects
  const allKeys = new Set<string>();
  data.forEach(item => {
    Object.keys(item).forEach(key => allKeys.add(key));
  });

  // Infer types for each field
  const fields: SchemaField[] = Array.from(allKeys).map(key => {
    // Get first non-null value for the field
    const sample = data.find(item => item[key] != null)?.[key];
    
    return {
      name: key,
      type: inferFieldType(sample),
      sample
    };
  });

  return { fields };
}