 
import { AxiosRequestConfig } from "axios";
import HttpClient from "../http/HttpClient";
import UserGateway from "./UserGateway";


export default class UserHttpGateway implements UserGateway {

  constructor(readonly httpClient: HttpClient, readonly url: string) {
  }


  async getData(): Promise<any> {
 
    const message: string = this.httpClient.get(this.url);


    return message 


  }

}