import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../domain/exception/NotFoundError'
import { BadValueError } from '../../..//domain/exception/BadValueError'
import { UnauthorizedError } from '../../../domain/exception/UnauthorizedError'
import { InternalServerError } from '../../../domain/exception/InternalServerError' 
import { DefaultError } from '../../../domain/exception/DefaultError'
import HttpStatusCode from './HttpStatusCode'
import { BaseResponse } from '../../../domain/model/BaseResponse'

export class ErrorMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static errorHandler(error: DefaultError, _request: Request, response: Response, _next: NextFunction): void {
    if (error instanceof NotFoundError) {
      return ErrorMiddleware.notFoundHandler(error, response)
    }

    if (error instanceof BadValueError) {
      return ErrorMiddleware.badValueHandler(error, response)
    }

    if (error instanceof UnauthorizedError) {
      return ErrorMiddleware.unauthorizedHandler(error, response)
    }

    if (error instanceof InternalServerError) {
      return ErrorMiddleware.internalServerErrorHandler(error, response)
    }

    const status = error.status || error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static notFoundHandler(error: DefaultError, response: Response): void {
    const status = HttpStatusCode.NOT_FOUND
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static badValueHandler(error: DefaultError, response: Response): void {
    const status = HttpStatusCode.BAD_REQUEST
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static unauthorizedHandler(error: DefaultError, response: Response): void {
    const status = HttpStatusCode.UNAUTHORIZED
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static internalServerErrorHandler(error: DefaultError, response: Response): void {
    const status = HttpStatusCode.INTERNAL_SERVER_ERROR
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static createErrorResponse(error: DefaultError, status: number, response: Response): Response {
    const baseResponse = new BaseResponse(status, error.message, error.data || {}, true)

    response.status(status)
    response.json(baseResponse)
    return response
  }
}
