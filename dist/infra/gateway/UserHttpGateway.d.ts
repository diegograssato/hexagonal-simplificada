import HttpClient from "../http/HttpClient";
import UserGateway from "./UserGateway";
export default class UserHttpGateway implements UserGateway {
    readonly httpClient: HttpClient;
    readonly url: string;
    constructor(httpClient: HttpClient, url: string);
    getData(): Promise<any>;
}
