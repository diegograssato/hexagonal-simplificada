import CryptoProvider from "src/infra/crypto/CryptoProvider";
import UserCollection from "../repository/UserCollection";
import UserGateway from "src/infra/gateway/UserGateway";
import { Logger } from "log4js";
export default interface RegisterUserFactory {
    createUserRepository(): UserCollection;
    createCryptoProvider(): CryptoProvider;
    createUserGateway(): UserGateway;
    getLogger(name: string): Logger;
}
