
// code imports
import { config } from 'dotenv' 
import { getEnv } from './environments'
config()

 

/**
 * moment configuration
 * @memberof config
 */
const momentConfig = {
  timezone: getEnv('TIMEZONE', 'America/Sao_Paulo')
}

const envProdName = 'production'

/**
 * general application configuration
 * @memberof config
 */
const appConfig = {
  appName: getEnv('APP_NAME', 'hexagonal-simplificado'),
  isProduction: getEnv('NODE_ENV') === envProdName,
  envName: getEnv('NODE_ENV', envProdName),
  port: getEnv('NODE_PORT', '8000'),
  logDir: process.env.LOG_DIR || 'logs',
  logLevel: getEnv('NODE_ENV') === envProdName ? 'info' : 'debug', 
}

/**
 * general aws configuration
 * @memberof config
 */
const APISConfig = {
  httpbin: getEnv('HTTP_BIN', "https://httpbin.org/uuid"),
}

/**
 * logger configuration fixed for all jobs
 * @memberof config
 * @layouts https://github.com/log4js-node/log4js-node/blob/master/docs/layouts.md
 */
const loggerConf =  {
    appenders: {
      out: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: "%[[%d] [%p] [%c] %] %m",
        }
      },
    request: {
      type: 'console',
      layout: {
        type: 'pattern',
        //pattern: "%[[%d] [%p] [%c] %] %m",
        pattern: "%[[%d] [%p] [%X{requestId}] [%c] %]%m",
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
      request: {
        appenders: [
          'request'
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
  }

export {
  appConfig,  
  envProdName,
  APISConfig,
  momentConfig,
  loggerConf
}