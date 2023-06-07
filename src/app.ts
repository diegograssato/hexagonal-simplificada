import { appConfig } from './config'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import UserController from "./infra/controller/UserController"; 
import RegisterUser from "./application/usecase/RegisterUseCase";
import RegisterUserFactory from "./application/factory/RegisterUserFactory"; 
import RegisterUserHttpCryptoFactory from './infra/factory/RegisterUserHttpCryptoFactory';
import { logger } from './infra/logger/logger'; 
import HttpServer from './infra/http/HttpServer';
const tracer = require('../tracing');
import axios, { AxiosResponse } from "axios";


class App {
  public httpServer: HttpServer 
  /**
   * Enum for ETodoStatus values.
   * @readonly
   * @memberof business
   * @enum {string}
   */
  constructor() { 
    this.httpServer = new ExpressAdapter(); 
    this.handlers();
  }
  async handlers(): Promise<void> {

    const registerUserFactory: RegisterUserFactory = new RegisterUserHttpCryptoFactory();
    const register = new RegisterUser(registerUserFactory);
 
    new UserController(this.httpServer, register, logger);
    
    this.httpServer.handlers();
    this.httpServer.listen(parseInt(appConfig.port));
    
    // this.httpServer.listen(parseInt(appConfig.port)).then(err){
    //   if (err) console.log("Error in server setup")
    //   console.log("Server listening on Port %s", appConfig.port);
    // });
    // const server = this.httpServer.listen(parseInt(appConfig.port)).then(() => {
    
    //   logger.info("Server listening on Port %s.", appConfig.port);
       
    //   //throw Error("Ra")
    // }).catch((e: any) => {

    //   logger.error(e.message);
    //   server.close();
    //   process.exit(1);

     
    // } ); 


  }
}

export default new App().httpServer;  

