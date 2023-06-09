/**
 * get environment variable
 * @memberof config
 * @param {string} env environment variable name
 * @param {string} [defaultValue=''] default value
 * @returns {string} environment variable value
 */

export const getEnv = (env: string, defaultValue = '') => process.env[env] || defaultValue