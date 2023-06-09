"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(httpServer, useCaseRegister, logger) {
        this.httpServer = httpServer;
        this.useCaseRegister = useCaseRegister;
        this.logger = logger;
        httpServer.register("post", "/", async function (_params, body) {
            await useCaseRegister.execute(body);
            logger.info("Acessando via POST ");
            return { email: "diego.grassato@gmail.com", password: "grassato" };
        });
        httpServer.register("get", "/", async function (params) {
            const data = { email: "diego.grassato@gmail.com", password: "grassato" };
            await useCaseRegister.execute(data);
            logger.debug("Acessando via GET", params);
            return "Diego";
        });
    }
}
exports.default = UserController;
