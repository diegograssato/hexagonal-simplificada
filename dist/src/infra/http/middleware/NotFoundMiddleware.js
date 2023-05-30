"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
const HttpStatusCode_1 = __importDefault(require("./HttpStatusCode"));
const BaseResponse_1 = require("../../../domain/model/BaseResponse");
class NotFoundMiddleware {
    static notFoundHandler(_request, response) {
        const baseResponse = new BaseResponse_1.BaseResponse(HttpStatusCode_1.default.NOT_FOUND, 'Resource not found', {}, true);
        response.status(HttpStatusCode_1.default.NOT_FOUND);
        response.json(baseResponse);
        return response;
    }
}
exports.NotFoundMiddleware = NotFoundMiddleware;
//# sourceMappingURL=NotFoundMiddleware.js.map