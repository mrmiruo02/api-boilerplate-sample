abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract errorCode: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    status: string;
    code: number;
    error: {
      code: string;
      details: { message: string; property?: string }[];
    };
  };
}

export default CustomError;
