declare const momentConfig: {
    timezone: string;
};
declare const envProdName = "production";
declare const appConfig: {
    appName: string;
    isProduction: boolean;
    envName: string;
    port: string;
    logDir: string;
    logLevel: string;
};
declare const APISConfig: {
    httpbin: string;
};
declare const loggerConf: {
    appenders: {
        out: {
            type: string;
            layout: {
                type: string;
                pattern: string;
            };
        };
        dateFile: {
            type: string;
            filename: string;
            layout: {
                type: string;
            };
            compress: boolean;
            keepFileExt: boolean;
        };
        business: {
            type: string;
            layout: {
                type: string;
                pattern: string;
            };
        };
        file: {
            type: string;
            filename: string;
        };
    };
    categories: {
        default: {
            appenders: string[];
            level: string;
        };
        business: {
            appenders: string[];
            level: string;
        };
    };
};
export { appConfig, envProdName, APISConfig, momentConfig, loggerConf };
