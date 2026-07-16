export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export function parseApiError(err: unknown): {
  generalError: string;
  fieldErrors: Record<string, string>;
} {
  const axiosErr = err as {
    response?: { data?: ApiValidationError };
  };

  const fieldErrors: Record<string, string> = {};
  const errors = axiosErr.response?.data?.errors;

  if (errors) {
    for (const [field, msgs] of Object.entries(errors)) {
      fieldErrors[field] = msgs[0];
    }
  }

  return {
    generalError: axiosErr.response?.data?.message || 'An error occurred',
    fieldErrors,
  };
}
