"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = exports.MetaResponse = void 0;
class MetaResponse {
    constructor(requestTime = new Date(), totalRecords, totalPages) {
        this.requestTime = requestTime;
        this.totalRecords = totalRecords;
        this.totalPages = totalPages;
    }
}
exports.MetaResponse = MetaResponse;
class BaseResponse {
    constructor(status, message, data, errors = false, meta = new MetaResponse()) {
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=BaseResponse.js.map