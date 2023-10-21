interface IRep {
    message: string;
    statusCode: number;
    data?: any; 
}

export interface IRep200 {
    schema: {
        response: {
            200: IRep
        }
    };
}

export interface IRep201 {
    schema: {
        response: {
            201: IRep
        }
    };
}

export interface IRep202 {
    schema: {
        response: {
            202: IRep
        }
    };
}

export interface IRep204 {
    schema: {
        response: {
            204: IRep
        }
    };
}