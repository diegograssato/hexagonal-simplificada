import RegisterUserFactory from "src/application/factory/RegisterUserFactory";
import UserCollection from "src/application/repository/UserCollection";
import CryptoProvider from "../crypto/CryptoProvider";
import UserGateway from "../gateway/UserGateway";
import { Logger } from "log4js";
export default class RegisterUserHttpCryptoFactory implements RegisterUserFactory {
    createUserRepository(): UserCollection;
    createCryptoProvider(): CryptoProvider;
    createUserGateway(): UserGateway;
    getLogger(name: string): Logger;
}
