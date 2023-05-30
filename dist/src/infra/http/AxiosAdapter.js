"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosAdapter {
    async get(url) {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    async post(url, body) {
        const response = await axios_1.default.post(url, body);
        return response.data;
    }
}
exports.default = AxiosAdapter;
//# sourceMappingURL=AxiosAdapter.js.map