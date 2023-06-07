import express, { Request, Response, Express, NextFunction } from 'express'
import cors from "cors";
import compression from "compression";
import helmet from 'helmet';
import HttpServer from "./HttpServer";
import bodyParser from 'body-parser'
import actuator from 'express-actuator' 
import { appConfig } from '../../config'
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { NotFoundMiddleware } from "./middleware/NotFoundMiddleware";
import HttpStatusCode from "./middleware/HttpStatusCode";
import { BaseResponse } from "../../domain/model/BaseResponse";
import { logger } from '../../infra/logger/logger';
import log4js,{ Logger, getLogger } from 'log4js'; 
import axios, { AxiosResponse } from "axios";
import { createId } from '@paralleldrive/cuid2';
import HttpServerMiddleware from './middleware/HttpServerMiddleware';
import ExpressBrute from "express-brute";

export default class ExpressAdapter implements HttpServer {
  readonly app: Express;
  public logger: Logger;

  readonly swaggerUi = require('swagger-ui-express')
  readonly swaggerSpec = require('../../infra/swagger')

  constructor() {
    this.logger = getLogger("request");
    this.app = express();
    this.middlewares();
    this.swagger();
  }
 
  middlewares(): void {
     
    this.app.use(log4js.connectLogger(this.logger, { level: 'auto' }));

    this.app.disable(`x-powered-by`);
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(actuator());
    this.app.use(helmet({
      contentSecurityPolicy: appConfig.isProduction
    }));
    this.app.use(HttpServerMiddleware.relationRequest);

    // this.app.use((req, res, next) => {
    //   const requestId: string =  createId();

    //   const requestIdField = "x-request-id"
    //   const correlationIdField = "x-correlation-id"
      
    //   if (req.headers[requestIdField]){
    //     const correlationId: string = req.headers[requestIdField].toString();    
    //     req.headers[correlationIdField] = correlationId ;
    //     res.set(correlationIdField, correlationId);

    //   } 

    //   req.headers[requestIdField] = requestId;
    //   res.set(requestIdField, requestId);
    //   res.locals.id = requestId;
      
    //   axios.interceptors.request.use(function (config) {
  
    //     config.headers[requestIdField] = req.headers[requestIdField];
        
    //     if (req.headers[correlationIdField]){
    //       config.headers[correlationIdField] = req.headers[correlationIdField];
    //     }
        
    //     return config;
    //   }, function (error) {
       
    //     return Promise.reject(error);
    //   }); 
    //   next()
    // });
  }
  
 

  handlers(): void {
    
    this.app.use(ErrorMiddleware.errorHandler);
    this.app.use(NotFoundMiddleware.notFoundHandler);
    
  }

  swagger(): void {
    if (appConfig.isProduction) {
      return
    }

    const options = {
      customCss: '.swagger-ui .topbar { display: none }'
    }
    this.app.use(
      '/swagger',
      this.swaggerUi.serve,
      this.swaggerUi.setup(this.swaggerSpec.getSwaggerJSDoc(), options)
    )
    this.app.get('/swagger.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(this.swaggerSpec.getSwaggerJSDoc())
    })
  }


  async register(method: string, url: string, callback: Function): Promise<void> {
    if (!(method in this.app)){
      throw new Error(`Method ${method} not found!`);
    }
    var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
    var bruteforce = new ExpressBrute(store);
    this.app[method as keyof typeof this.app](url, async function (req: Request, res: Response, next: NextFunction) {
      try {
     
        const output = await callback(req.params, req.body);
        const response = new BaseResponse(HttpStatusCode.OK, "SUCCESS", output);
        bruteforce.prevent, // error 429 if we hit this route too often

        res.status(HttpStatusCode.OK).json(response);

      } catch (error) { 
        next(error)
      }
    
    });
  }
 

  async listen(port: number) {
   
    try{
      return this.app.listen(port,()=>{
        logger.info("Server listening on Port %s.", port);
      });
   
    }catch(e){
      console.log("In use.")
    }
  }

}