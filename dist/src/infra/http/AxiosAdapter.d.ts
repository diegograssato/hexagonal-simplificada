import HttpClient from "./HttpClient";
export default class AxiosAdapter implements HttpClient {
    get(url: string): Promise<any>;
    post(url: string, body: any): Promise<any>;
}
