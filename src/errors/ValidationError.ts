import CustomError from './customError';

class ValidationError extends CustomError {
  status = 'error';
  statusCode = 400;
  errorCode = 'VALIDATION_ERROR';
  errors: { message: string; property: string }[];

  constructor(errors: { message: string; property: string }[]) {
    super('Validation failed');
    this.errors = errors;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      error: {
        code: this.errorCode,
        details: this.errors,
      },
    };
  }
}

export default ValidationError;
