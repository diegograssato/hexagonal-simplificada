"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class UserHttpGateway {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getData() {
        return await this.httpClient.get(config_1.APISConfig.httpbin);
    }
}
exports.default = UserHttpGateway;
//# sourceMappingURL=UserHttpGateway.js.map