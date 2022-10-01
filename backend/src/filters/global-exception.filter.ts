import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import {Request, Response} from 'express';
import { ErrorResponse } from "../types";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(
    exception: unknown,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    //logging errors in Node
    console.error(exception);

    res.json({
      isSuccess: false,
      msgError: ''
    } as ErrorResponse);
  }
}