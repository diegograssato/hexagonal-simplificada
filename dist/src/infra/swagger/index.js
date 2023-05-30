"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerJSDoc = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
function getSwaggerJSDoc() {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Documentação para o projeto NodeJs',
                version: '1.0.0',
                description: 'Esse projeto tem o objetivo de servir como backend para os sistemas criados nas necessidades existentes de reestruturação',
                contact: {
                    name: 'Reestruturação',
                    url: '',
                    email: ''
                }
            },
            servers: [
                {
                    url: 'http://localhost:3333',
                    description: 'Ambiente local'
                },
                {
                    url: 'http://10.22.0.20:8081',
                    description: 'Remote'
                }
            ]
        },
        apis: ['./src/infra/controller/*.ts', '../../parameters.yaml']
    };
    return (0, swagger_jsdoc_1.default)(options);
}
exports.getSwaggerJSDoc = getSwaggerJSDoc;
//# sourceMappingURL=index.js.map