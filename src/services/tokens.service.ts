import jwt from 'jsonwebtoken';
import envConfig from '../environment/env.config';
import User from '../interfaces/users/User.interface';

type TokenAction = 'authentication' | 'reset_password' | 'account_verification';

export default class TokensService {

    createToken(user: User, action: TokenAction,  expirationDate?: Date | number) {
        const defaultExpirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30);
        const token = jwt.sign({
            user,
            exp: expirationDate ? expirationDate : defaultExpirationDate,
            action
        }, <string>envConfig.JWT_SECRET);
        return token;
    }

    verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, <string>envConfig.JWT_SECRET, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }

}