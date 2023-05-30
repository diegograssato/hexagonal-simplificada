import { Logger, configure, getLogger } from 'log4js';
import { loggerConf } from '../../../config'

export default class BusinessLogger {

  getBusinessLogger(name: string): Logger {

    configure(loggerConf);
    const logger = getLogger("business");
    logger.addContext('businessID', name);

    return logger; 

  }

}