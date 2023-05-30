 
import { configure, getLogger } from 'log4js';
import { loggerConf } from '../../config'
 

configure(loggerConf);


export const logger = getLogger("default");

 
