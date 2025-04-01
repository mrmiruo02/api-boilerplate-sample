import { ZodSchema, ZodError } from 'zod';
import ValidationError from '../errors/ValidationError';

/**
 * validate inputs
 * @param {ZodSchema<T>} schema
 * @param {unknown} data
 * @returns {T}
 */
const validationInput = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data); // Directly parse; throws if invalid
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.format();
      const errorMessages: { message: string; property: string }[] = [];

      Object.entries(formattedErrors).forEach(([field, value]) => {
        if (
          typeof value === 'object' &&
          Object.keys(value).includes('_errors')
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errors = (value as any)._errors as string[];
          errors.forEach((msg) => {
            errorMessages.push({ property: field, message: msg });
          });
        }
      });

      throw new ValidationError(errorMessages);
    }
    throw error; // throw other unexpected errors
  }
};

export default validationInput;
