import { CustomError } from "./CustomError";

export class UnAuthorizeError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
