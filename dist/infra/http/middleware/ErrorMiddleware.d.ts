import { Request, Response, NextFunction } from 'express';
import { DefaultError } from '../../../domain/exception/DefaultError';
export declare class ErrorMiddleware {
    static errorHandler(error: DefaultError, _request: Request, response: Response, _next: NextFunction): void;
    private static notFoundHandler;
    private static badValueHandler;
    private static unauthorizedHandler;
    private static internalServerErrorHandler;
    private static createErrorResponse;
}
