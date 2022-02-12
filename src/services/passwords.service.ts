import bcrypt from 'bcryptjs';

export default class PasswordsService {

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    comparePasswords(candidatePassword: string, password: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, password);
    }

}