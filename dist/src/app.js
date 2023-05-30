"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const ExpressAdapter_1 = __importDefault(require("./infra/http/ExpressAdapter"));
const UserController_1 = __importDefault(require("./infra/controller/UserController"));
const RegisterUseCase_1 = __importDefault(require("./application/usecase/RegisterUseCase"));
const RegisterUserHttpCryptoFactory_1 = __importDefault(require("./infra/factory/RegisterUserHttpCryptoFactory"));
const logger_1 = require("./infra/ logger/logger");
class App {
    constructor() {
        this.httpServer = new ExpressAdapter_1.default();
        this.handlers();
    }
    async handlers() {
        const registerUserFactory = new RegisterUserHttpCryptoFactory_1.default();
        const register = new RegisterUseCase_1.default(registerUserFactory);
        new UserController_1.default(this.httpServer, register, logger_1.logger);
        this.httpServer.handlers();
        this.httpServer.listen(parseInt(config_1.appConfig.port));
    }
}
exports.default = new App().httpServer;
//# sourceMappingURL=app.js.map