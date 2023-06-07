export declare class DefaultError extends Error {
    message: string;
    data?: object;
    status?: number;
    statusCode?: number;
    constructor(message: string, data?: object);
}
