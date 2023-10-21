interface IErr {
    message: string;
    error: string;
    statusCode: number;
}

export interface IErr400 {
    schema: {
        response: {
            400: IErr;
        }
    };
}

export interface IErr401 {
    schema: {
        response: {
            401: IErr;
        }
    };
}