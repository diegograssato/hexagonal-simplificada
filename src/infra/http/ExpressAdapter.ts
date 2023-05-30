import express, { Request, Response, Application } from 'express'
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
import log4js from 'log4js' 
import NodeCache from '../cache/NodeCache';


export default class ExpressAdapter implements HttpServer {
  public app: Application;

  public swaggerUi = require('swagger-ui-express')
  public swaggerSpec = require('../../infra/swagger')

  constructor() {
    this.app = express();
    this.middlewares();
    this.swagger();
  }
 
  middlewares(): void {
    
    this.app.use(log4js.connectLogger(logger, { level: 'auto' }));
    
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(actuator());
    this.app.use(helmet({
      contentSecurityPolicy: appConfig.isProduction
    }));
 
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
    this.app[method](url, async function (req: Request, res: Response) {
      try {
      
        const output = await callback(req.params, req.body);
        const response = new BaseResponse(HttpStatusCode.OK, "SUCCESS", output);

        res.status(HttpStatusCode.OK).json(response);
      } catch (error) {
        res.status(404).send(error);
      }
    
    });
  }
 

  async listen(port: number): Promise<void> {
   
    this.app.listen(port);''
   
  }

}