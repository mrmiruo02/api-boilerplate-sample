import { ZodSchema, ZodError, ZodFormattedError } from 'zod';
import ValidationError from '../errors/ValidationError';

/**
 * Recursively collects error messages from a ZodFormattedError
 * @param {ZodFormattedError<unknown>} formatted
 * @returns {Record<string, Record<string, string[]>>[]}
 */
const collectArrayIndexedErrors = (
  formatted: ZodFormattedError<unknown>
): Record<string, Record<string, string[]>>[] => {
  const output: Record<string, Record<string, string[]>>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries = Object.entries(formatted as Record<string, any>);
  const inner: Record<string, string[]> = {};
  for (const [key, value] of entries) {
    if (key === '_errors') {
      if (value.length > 0) {
        inner[key] = value;
      }
    }

    const subErrors = value as ZodFormattedError<unknown>;

    for (const [field, val] of Object.entries(subErrors)) {
      if (val && typeof val === 'object' && '_errors' in val) {
        const errorMessages = (val as ZodFormattedError<unknown>)._errors;
        if (errorMessages.length > 0) {
          inner[field] = errorMessages;
        }
      } else {
        const errorMessages = val;
        if (errorMessages.length > 0) {
          inner[key] = errorMessages;
        }
      }
    }

    if (Object.keys(inner).length > 0) {
      output.push({ [key]: inner });
    }
  }

  return output;
};

/**
 * Re-Structure Error Message
 * @param {Record<string, Record<string, string[]>>[]} array
 * @returns {{ property: string; message: string }[]}
 */
const flattenAndRemoveDuplicates = (
  array: Record<string, Record<string, string[]>>[]
): { property: string; message: string }[] => {
  const result: { property: string; message: string }[] = [];

  // Object to track already processed properties
  const seen: Record<string, boolean> = {};

  array.forEach((item) => {
    const fields = item[Object.keys(item)[0]];

    for (const [field, messages] of Object.entries(fields)) {
      if (!seen[field]) {
        // If the property is not in the "seen" object, add it to the result
        messages.forEach((message) => {
          result.push({ property: field, message });
        });

        // Mark this field as processed
        seen[field] = true;
      }
    }
  });

  return result;
};

/**
 * validate inputs
 * @param schema Zod schema
 * @param data Input data
 * @returns Parsed value if valid
 * @throws ValidationError if invalid
 */
const validationInput = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const structured = collectArrayIndexedErrors(error.format());
      if (structured.length > 1) {
        const flat = flattenAndRemoveDuplicates(structured);
        throw new ValidationError(flat);
      } else {
        for (const data of structured) {
          if ('_errors' in data) {
            const error = data._errors;
            throw new ValidationError([
              {
                property: 'Error',
                message: error._errors as unknown as string,
              },
            ]);
          } else {
            const flat = flattenAndRemoveDuplicates(structured);
            throw new ValidationError(flat);
          }
        }
      }
    }

    throw error;
  }
};

export default validationInput;
