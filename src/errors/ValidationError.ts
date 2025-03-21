import CustomError from "./customError";

class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "VALIDATION_ERROR";
  errors: { message: string; property: string }[];

  constructor(errors: { message: string; property: string }[]) {
    super("Validation failed");
    this.errors = errors;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}

export default ValidationError;