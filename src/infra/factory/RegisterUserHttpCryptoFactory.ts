import RegisterUserFactory from "src/application/factory/RegisterUserFactory";
import UserCollection from "src/application/repository/UserCollection";
import CryptoProvider from "../crypto/CryptoProvider";
import UserGateway from "../gateway/UserGateway"; 
import UserMemory from "../repository/UserMemory";
import UserHttpGateway from "../gateway/UserHttpGateway";
import AxiosAdapter from "../http/AxiosAdapter";
import CryptAdapter from "../crypto/CryptAdapter"; 
import { Logger } from "log4js";
import BusinessLogger from "../../application/usecase/shared/BusinessLogger";
import { APISConfig } from '../../config' 

export default class RegisterUserHttpCryptoFactory implements RegisterUserFactory{
    
  createUserRepository(): UserCollection {
    return new UserMemory();
  }

  createCryptoProvider(): CryptoProvider {
    return new CryptAdapter();
  }

  createUserGateway(): UserGateway {
 
     
    const httpClient = new AxiosAdapter();
    
    return new UserHttpGateway(httpClient, APISConfig.httpbin);
    
  }

  getLogger(name: string): Logger {

    const businessLogger = new BusinessLogger()
 
    return businessLogger.getBusinessLogger(name);
  
  }

}