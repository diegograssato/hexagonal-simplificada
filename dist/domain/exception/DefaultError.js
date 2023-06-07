"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultError = void 0;
class DefaultError extends Error {
    constructor(message, data) {
        super(message);
        this.message = message;
        this.data = data;
    }
}
exports.DefaultError = DefaultError;
