"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserMemory_1 = __importDefault(require("../repository/UserMemory"));
const UserHttpGateway_1 = __importDefault(require("../gateway/UserHttpGateway"));
const AxiosAdapter_1 = __importDefault(require("../http/AxiosAdapter"));
const CryptAdapter_1 = __importDefault(require("../crypto/CryptAdapter"));
const BusinessLogger_1 = __importDefault(require("../../application/usecase/shared/BusinessLogger"));
const config_1 = require("../../config");
class RegisterUserHttpCryptoFactory {
    createUserRepository() {
        return new UserMemory_1.default();
    }
    createCryptoProvider() {
        return new CryptAdapter_1.default();
    }
    createUserGateway() {
        const httpClient = new AxiosAdapter_1.default();
        return new UserHttpGateway_1.default(httpClient, config_1.APISConfig.httpbin);
    }
    getLogger(name) {
        const businessLogger = new BusinessLogger_1.default();
        return businessLogger.getBusinessLogger(name);
    }
}
exports.default = RegisterUserHttpCryptoFactory;
