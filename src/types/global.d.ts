import User from "../interfaces/users/User.interface";

declare global {

    namespace NodeJS {
        export interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            JWT_SECRET: string;
        }
    }

    namespace Express {
        export interface Request {
            user: User
        }
    }
}