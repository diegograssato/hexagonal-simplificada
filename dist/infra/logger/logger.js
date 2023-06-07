"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("log4js");
const config_1 = require("../../config");
(0, log4js_1.configure)(config_1.loggerConf);
exports.logger = (0, log4js_1.getLogger)("default");
