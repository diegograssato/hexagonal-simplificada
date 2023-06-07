import { Request, Response, NextFunction } from 'express'
import axios from "axios";
import { createId } from '@paralleldrive/cuid2';

export default class HttpServerMiddleware {
 
  static relationRequest(request: Request, response: Response, next: NextFunction): void {

    const requestIdField: string = "x-request-id"
    const correlationIdField: string = "x-correlation-id"  
    const requestId: string = createId();
 
    if (request.headers[requestIdField]){

      const correlationId: string = request.headers[requestIdField].toString();
      //request.headers[correlationIdField] = correlationId ;
      response.set(correlationIdField, correlationId);

    } 


  //request.headers[requestIdField] = requestId;
  response.set(requestIdField, requestId);
  response.locals.id = requestId;
  
    axios.interceptors.request.use(function (config) {

      config.headers[requestIdField] = request.headers[requestIdField];
      
      if (request.headers[correlationIdField]){
        config.headers[correlationIdField] = request.headers[correlationIdField];
      }
      
      return config;
    }, function (error) {
      
      return Promise.reject(error);
    }); 
    next()
  }
}
