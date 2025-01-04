export function generateId(): string {
  return 'group_' + Math.random().toString(36).substring(2, 11);
}