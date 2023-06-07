"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
const config_1 = require("../../../config");
class BusinessLogger {
    getBusinessLogger(name) {
        (0, log4js_1.configure)(config_1.loggerConf);
        const logger = (0, log4js_1.getLogger)("business");
        logger.addContext('businessID', name);
        return logger;
    }
}
exports.default = BusinessLogger;
