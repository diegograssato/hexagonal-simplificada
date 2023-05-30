export declare class MetaResponse {
    requestTime: Date;
    correlationId: string;
    totalRecords?: number;
    totalPages?: number;
    login: any;
    constructor(requestTime?: Date, totalRecords?: number, totalPages?: number);
}
export declare class BaseResponse {
    status: number;
    errors: boolean;
    message: string;
    data: any;
    meta?: MetaResponse;
    constructor(status: number, message: string, data: any, errors?: boolean, meta?: MetaResponse);
}
