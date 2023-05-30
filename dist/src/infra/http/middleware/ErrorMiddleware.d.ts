import { Request, Response, NextFunction } from 'express';
export declare class ErrorMiddleware {
    static errorHandler(error: any, _request: Request, response: Response, _next: NextFunction): void;
    private static notFoundHandler;
    private static badValueHandler;
    private static unauthorizedHandler;
    private static internalServerErrorHandler;
    private static createErrorResponse;
}
