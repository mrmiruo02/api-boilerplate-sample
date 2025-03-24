import CustomError from "./customError";

class AuthorizationError extends CustomError {
  statusCode = 401;
  errorCode = "UNAUTHORIZED";
  status = 'error';
  errors: { name: string; message: string; expiredAt?: string }[];

  constructor(errors: { name: string; message: string; expiredAt?: string }[]) {
    super("Unauthorized");
    this.errors = errors;

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }


  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      error: {
        code: this.errorCode,
        details: this.errors,
      }
    };
  }
}

export default AuthorizationError;