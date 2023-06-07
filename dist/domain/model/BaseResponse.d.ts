export declare class MetaResponse {
    requestTime: Date;
    correlationId: string;
    totalRecords?: number;
    totalPages?: number;
    constructor(requestTime?: Date, totalRecords?: number, totalPages?: number);
}
export declare class BaseResponse {
    status: number;
    errors: boolean;
    message: string;
    data: object;
    meta?: MetaResponse;
    constructor(status: number, message: string, data: object, errors?: boolean, meta?: MetaResponse);
}
