import { ZodError } from "zod";
import ValidationError from "../errors/ValidationError";

const validationInput = <T>(parseResult: { success: boolean; error?: ZodError<T> }) => {
  if (!parseResult.success && parseResult.error) {
    const formattedErrors = parseResult.error.format();
    const errorMessages: { message: string; property: string }[] = [];

    // Extract field and message from formatted errors
    Object.entries(formattedErrors).forEach(([field, value]) => {
      if (typeof value === "object" && "_errors" in value) {
        value._errors.forEach((msg) => {
          errorMessages.push({ property: field, message: msg });
        });
      }
    });

    // Throw ValidationError with structured errors
    throw new ValidationError(errorMessages);
  }
}

export default validationInput;