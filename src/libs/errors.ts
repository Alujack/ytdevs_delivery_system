export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return { error: error.message, code: error.code, statusCode: error.statusCode }
  }
  
  console.error('Unhandled error:', error)
  return { error: 'Internal Server Error', statusCode: 500 }
}