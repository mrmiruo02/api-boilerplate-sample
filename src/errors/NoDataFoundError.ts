import CustomError from './customError';

class NoDataFoundError extends CustomError {
  status = 'error';
  statusCode = 404;
  errorCode = 'NO_DATA_FOUND';
  errors: { message: string }[];

  constructor(errors: { message: string }[]) {
    super('No data found');
    this.errors = errors;

    Object.setPrototypeOf(this, NoDataFoundError.prototype);
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

export default NoDataFoundError;
