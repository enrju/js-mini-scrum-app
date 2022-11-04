import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import {Request, Response} from 'express';
import { ErrorResponse } from "../types";
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(
    exception: unknown,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    // //logging errors in Node
    // console.error(exception);

    if(exception instanceof RecordNotFoundError
    || exception instanceof RecordValidationError) {
      res
        .status(exception.getStatus())
        .json({
          isSuccess: false,
          msgError: exception.message,
      } as ErrorResponse);
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          isSuccess: false,
          msgError: 'Internal Server Error',
      } as ErrorResponse);
    }
  }
}