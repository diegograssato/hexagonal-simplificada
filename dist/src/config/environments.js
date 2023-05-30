"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (env, defaultValue = '') => process.env[env] || defaultValue;
exports.getEnv = getEnv;
//# sourceMappingURL=environments.js.map