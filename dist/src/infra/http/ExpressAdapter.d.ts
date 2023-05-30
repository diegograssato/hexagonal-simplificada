import HttpServer from "./HttpServer";
export default class ExpressAdapter implements HttpServer {
    app: any;
    swaggerUi: any;
    swaggerSpec: any;
    constructor();
    middlewares(): void;
    handlers(): void;
    swagger(): void;
    register(method: string, url: string, callback: (params: any, body: any) => void): Promise<void>;
    listen(port: number): Promise<void>;
}
