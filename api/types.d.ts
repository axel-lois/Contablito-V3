declare namespace Express {
    export interface Request {
        token: string;
        userID:string;
    }
}