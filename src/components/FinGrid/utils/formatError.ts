export function formatError(error: Error): Record<string, any> {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause,
    ...(error as any)
  };
}