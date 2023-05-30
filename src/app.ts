import { appConfig } from './config'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import UserController from "./infra/controller/UserController"; 
import RegisterUser from "./application/usecase/RegisterUseCase";
import RegisterUserFactory from "./application/factory/RegisterUserFactory"; 
import RegisterUserHttpCryptoFactory from './infra/factory/RegisterUserHttpCryptoFactory';
import { logger } from './infra/logger/logger'; 
import HttpServer from './infra/http/HttpServer';
import NodeCache from './infra/cache/NodeCache';

class App {
  public httpServer: HttpServer 

  constructor() { 
    this.httpServer = new ExpressAdapter(); 
    this.handlers();
  }
  async handlers(): Promise<void> {
 

    const registerUserFactory: RegisterUserFactory = new RegisterUserHttpCryptoFactory();
    const register = new RegisterUser(registerUserFactory);
 
    new UserController(this.httpServer, register, logger);
    
    
    this.httpServer.handlers();
    this.httpServer.listen(parseInt(appConfig.port))

  }
}

export default new App().httpServer;  

