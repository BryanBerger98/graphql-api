import bcrypt from 'bcryptjs';

export default class PasswordsService {

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    comparePasswords(candidatePassword: string, password: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, password);
    }

    generatePassword(): string {
        const passwordLength = 12;
        const passwordCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&-_/$*!?=.+^';
        let generatedPassword = '';
        for (let i = 0, n = passwordCharset.length; i < passwordLength; ++i) {
            generatedPassword += passwordCharset.charAt(Math.floor(Math.random() * n));
        }
        return generatedPassword;
    }


}