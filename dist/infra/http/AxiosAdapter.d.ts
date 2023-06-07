import { AxiosResponse } from "axios";
import HttpClient from "./HttpClient";
export default class AxiosAdapter implements HttpClient {
    get(url: string): Promise<AxiosResponse>;
    post(url: string, body: object): Promise<AxiosResponse>;
}
