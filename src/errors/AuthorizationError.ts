import CustomError from "./customError";

class AuthorizationError extends CustomError {
  errorCode = 401;
  errorType = "UNAUTHORIZED";
  errors: { name: string; message: string; expiredAt?: string }[];

  constructor(errors: { name: string; message: string; expiredAt?: string }[]) {
    super("Unauthorized");
    this.errors = errors;

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }


  serializeErrors() {
    return this.errors;
  }
}

export default AuthorizationError;