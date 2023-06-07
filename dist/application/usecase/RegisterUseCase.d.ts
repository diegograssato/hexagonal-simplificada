import { Logger } from "log4js";
import User from "../../domain/entity/User";
import CryptoProvider from "../../infra/crypto/CryptoProvider";
import RegisterUserFactory from "../factory/RegisterUserFactory";
import UserCollection from "../repository/UserCollection";
import UseCase from "./shared/UseCase";
import UserGateway from "src/infra/gateway/UserGateway";
export default class RegisterUser implements UseCase<Required<User>, void> {
    private factory;
    cryptoProvider: CryptoProvider;
    gateway: UserGateway;
    repository: UserCollection;
    logger: Logger;
    constructor(factory: RegisterUserFactory);
    execute(user: Required<User>): Promise<void>;
}
