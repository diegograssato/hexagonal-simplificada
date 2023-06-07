"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConf = exports.momentConfig = exports.APISConfig = exports.envProdName = exports.appConfig = void 0;
const dotenv_1 = require("dotenv");
const environments_1 = require("./environments");
(0, dotenv_1.config)();
const momentConfig = {
    timezone: (0, environments_1.getEnv)('TIMEZONE', 'America/Sao_Paulo')
};
exports.momentConfig = momentConfig;
const envProdName = 'production';
exports.envProdName = envProdName;
const appConfig = {
    appName: (0, environments_1.getEnv)('APP_NAME', 'hexagonal-simplificado'),
    isProduction: (0, environments_1.getEnv)('NODE_ENV') === envProdName,
    envName: (0, environments_1.getEnv)('NODE_ENV', envProdName),
    port: (0, environments_1.getEnv)('NODE_PORT', '8000'),
    logDir: process.env.LOG_DIR || 'logs',
    logLevel: (0, environments_1.getEnv)('NODE_ENV') === envProdName ? 'info' : 'debug',
};
exports.appConfig = appConfig;
const APISConfig = {
    httpbin: (0, environments_1.getEnv)('HTTP_BIN', "https://httpbin.org/uuid"),
};
exports.APISConfig = APISConfig;
const loggerConf = {
    appenders: {
        out: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: "%[[%d] [%p] [%c] %] %m",
            }
        },
        dateFile: {
            type: 'dateFile',
            filename: `${appConfig.appName}.log`,
            layout: { type: 'basic' },
            compress: true,
            keepFileExt: true
        },
        business: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: "%[[%d] [%p] [%c] [%X{businessID}] %]%m",
            }
        },
        file: { type: "file", filename: `${appConfig.logDir}/${appConfig.appName}.log` }
    },
    categories: {
        default: {
            appenders: [
                'out'
            ],
            level: appConfig.logLevel
        },
        business: {
            appenders: [
                'business'
            ],
            level: appConfig.logLevel
        }
    }
};
exports.loggerConf = loggerConf;
