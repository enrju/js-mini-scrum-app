import { HttpException, HttpStatus } from "@nestjs/common";

export class RecordNotFoundError extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}

export class RecordValidationError extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}