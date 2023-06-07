"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const NotFoundError_1 = require("../../../domain/exception/NotFoundError");
const BadValueError_1 = require("../../..//domain/exception/BadValueError");
const UnauthorizedError_1 = require("../../../domain/exception/UnauthorizedError");
const InternalServerError_1 = require("../../../domain/exception/InternalServerError");
const HttpStatusCode_1 = __importDefault(require("./HttpStatusCode"));
const BaseResponse_1 = require("../../../domain/model/BaseResponse");
class ErrorMiddleware {
    static errorHandler(error, _request, response, _next) {
        if (error instanceof NotFoundError_1.NotFoundError) {
            return ErrorMiddleware.notFoundHandler(error, response);
        }
        if (error instanceof BadValueError_1.BadValueError) {
            return ErrorMiddleware.badValueHandler(error, response);
        }
        if (error instanceof UnauthorizedError_1.UnauthorizedError) {
            return ErrorMiddleware.unauthorizedHandler(error, response);
        }
        if (error instanceof InternalServerError_1.InternalServerError) {
            return ErrorMiddleware.internalServerErrorHandler(error, response);
        }
        const status = error.status || error.statusCode || HttpStatusCode_1.default.INTERNAL_SERVER_ERROR;
        ErrorMiddleware.createErrorResponse(error, status, response);
    }
    static notFoundHandler(error, response) {
        const status = HttpStatusCode_1.default.NOT_FOUND;
        ErrorMiddleware.createErrorResponse(error, status, response);
    }
    static badValueHandler(error, response) {
        const status = HttpStatusCode_1.default.BAD_REQUEST;
        ErrorMiddleware.createErrorResponse(error, status, response);
    }
    static unauthorizedHandler(error, response) {
        const status = HttpStatusCode_1.default.UNAUTHORIZED;
        ErrorMiddleware.createErrorResponse(error, status, response);
    }
    static internalServerErrorHandler(error, response) {
        const status = HttpStatusCode_1.default.INTERNAL_SERVER_ERROR;
        ErrorMiddleware.createErrorResponse(error, status, response);
    }
    static createErrorResponse(error, status, response) {
        const baseResponse = new BaseResponse_1.BaseResponse(status, error.message, error.data || {}, true);
        response.status(status);
        response.json(baseResponse);
        return response;
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
