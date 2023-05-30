
import { Request, Response } from 'express' 
import HttpStatusCode from './HttpStatusCode' 
import { BaseResponse } from '../../../domain/model/BaseResponse'

export class NotFoundMiddleware {
  static notFoundHandler(_request: Request, response: Response): Response {
    const baseResponse = new BaseResponse(HttpStatusCode.NOT_FOUND, 'Resource not found', {}, true)

    response.status(HttpStatusCode.NOT_FOUND)
    response.json(baseResponse)
    return response
  }
}
