export interface IErrorResponse {
    data: {
        message: string;
        statusCode: number;
    };
    status: number;
}
