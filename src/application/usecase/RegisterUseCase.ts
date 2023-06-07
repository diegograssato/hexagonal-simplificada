 
import { Logger } from "log4js";
import User from "../../domain/entity/User"; 
import CryptoProvider from "../../infra/crypto/CryptoProvider"; 
import RegisterUserFactory from "../factory/RegisterUserFactory";
 
import UserCollection from "../repository/UserCollection"; 
import UseCase from "./shared/UseCase";
import UserGateway from "src/infra/gateway/UserGateway";

export default class RegisterUser implements UseCase<Required<User>,void> {

  cryptoProvider: CryptoProvider;
  gateway: UserGateway;
  repository: UserCollection;
  logger: Logger;

  // entrada um provedor de cryptografia
  constructor(private factory: RegisterUserFactory){
    this.cryptoProvider = factory.createCryptoProvider();
    this.gateway = factory.createUserGateway();
    this.repository = factory.createUserRepository();
    this.logger = factory.getLogger("RegisterUser");
  }

  async execute(user: Required<User>): Promise<void> {
 
    const passwordCripto = await this.cryptoProvider.crypt(user.password);
    
    // dependecia externa
    //const data = await this.gateway.getData()
    
    this.logger.info("Dentro do useCase", "asdasda")
    // nova instancia
    const userTosave = { ...user, id: "11111-", password: passwordCripto } 
    
    // adiciona usuario
    await this.repository.add(userTosave); 

  }

}