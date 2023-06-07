/// <reference types="node" />
import { Express } from 'express';
import HttpServer from "./HttpServer";
export default class ExpressAdapter implements HttpServer {
    readonly app: Express;
    swaggerUi: any;
    swaggerSpec: any;
    constructor();
    middlewares(): void;
    handlers(): void;
    swagger(): void;
    register(method: string, url: string, callback: Function): Promise<void>;
    listen(port: number): Promise<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
}
