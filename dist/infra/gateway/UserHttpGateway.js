"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserHttpGateway {
    constructor(httpClient, url) {
        this.httpClient = httpClient;
        this.url = url;
    }
    async getData() {
        return await this.httpClient.get(this.url);
    }
}
exports.default = UserHttpGateway;
