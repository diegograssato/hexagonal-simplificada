import HttpClient from "../http/HttpClient";
import UserGateway from "./UserGateway";
export default class UserHttpGateway implements UserGateway {
    readonly httpClient: HttpClient;
    constructor(httpClient: HttpClient);
    getData(): Promise<any>;
}
