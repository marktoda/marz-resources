import { NextFunction, Request, Response } from 'express';

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class NotFound extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class Invalid extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message,
    })
}
 
