"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_actuator_1 = __importDefault(require("express-actuator"));
const config_1 = require("../../config");
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const NotFoundMiddleware_1 = require("./middleware/NotFoundMiddleware");
const HttpStatusCode_1 = __importDefault(require("./middleware/HttpStatusCode"));
const BaseResponse_1 = require("../../domain/model/BaseResponse");
const logger_1 = require("../../infra/ logger/logger");
const log4js_1 = __importDefault(require("log4js"));
class ExpressAdapter {
    constructor() {
        this.swaggerUi = require('swagger-ui-express');
        this.swaggerSpec = require('../../infra/swagger');
        this.app = (0, express_1.default)();
        this.middlewares();
        this.swagger();
    }
    middlewares() {
        this.app.use(log4js_1.default.connectLogger(logger_1.logger, { level: 'auto' }));
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, express_actuator_1.default)());
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: config_1.appConfig.isProduction
        }));
    }
    handlers() {
        this.app.use(ErrorMiddleware_1.ErrorMiddleware.errorHandler);
        this.app.use(NotFoundMiddleware_1.NotFoundMiddleware.notFoundHandler);
    }
    swagger() {
        if (config_1.appConfig.isProduction) {
            return;
        }
        const options = {
            customCss: '.swagger-ui .topbar { display: none }'
        };
        this.app.use('/swagger', this.swaggerUi.serve, this.swaggerUi.setup(this.swaggerSpec.getSwaggerJSDoc(), options));
        this.app.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(this.swaggerSpec.getSwaggerJSDoc());
        });
    }
    async register(method, url, callback) {
        this.app[method](url, async function (req, res) {
            try {
                const output = await callback(req.params, req.body);
                const response = new BaseResponse_1.BaseResponse(HttpStatusCode_1.default.OK, "SUCCESS", output);
                res.status(HttpStatusCode_1.default.OK).json(response);
            }
            catch (error) {
                res.status(404).send(error);
            }
        });
    }
    async listen(port) {
        return this.app.listen(port, () => console.log(`Listening on port ${port}`));
    }
}
exports.default = ExpressAdapter;
//# sourceMappingURL=ExpressAdapter.js.map