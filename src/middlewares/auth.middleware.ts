import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import envConfig from '../environment/env.config';
import User from '../interfaces/users/User.interface';

interface JwtPayload extends jwt.JwtPayload {
    user: User;
}
export default class AuthMiddleware {

    constructor() {
        this.getUser.bind(this);
    }
    
    getUser(req: Request, res: Response, next: NextFunction): void {
        if (req && req.cookies) {
            const token = req.cookies.token;
            if (!token) {
                return next();
            }
            const { user } = <JwtPayload>jwt.verify(token, <string>envConfig.JWT_SECRET);
            req.user = user;
            return next();
        }
    }

}