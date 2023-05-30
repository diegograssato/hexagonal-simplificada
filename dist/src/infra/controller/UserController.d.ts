import UseCase from "src/application/usecase/shared/UseCase";
import HttpServer from "../http/HttpServer";
import { Logger } from "log4js";
export default class UserController {
    readonly httpServer: HttpServer;
    readonly useCaseRegister: UseCase<any, any>;
    readonly logger: Logger;
    constructor(httpServer: HttpServer, useCaseRegister: UseCase<any, any>, logger: Logger);
}
