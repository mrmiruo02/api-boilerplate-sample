import { ZodSchema, ZodError } from "zod";
import ValidationError from "../errors/ValidationError";

const validationInput = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data); // Directly parse; throws if invalid 
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.format();
      const errorMessages: { message: string; property: string }[] = [];

      Object.entries(formattedErrors).forEach(([field, value]) => {
        if (typeof value === "object" && "_errors" in value) {
          const errors = value._errors as string[];
          errors.forEach((msg) => {
            errorMessages.push({ property: field, message: msg });
          });
        }
      });

      throw new ValidationError(errorMessages);
    }
    throw error; // Rethrow other unexpected errors
  }
};

export default validationInput;
