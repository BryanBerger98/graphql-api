import Credentials from "../interfaces/auth/credentials.interface";
import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UsersRepository from "../repositories/users.repository";
import PasswordsService from "./passwords.service";
import TokensService from "./tokens.service";

export default class AuthService {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService,
        private tokensService: TokensService
    ) {}

    async signupUserWithEmailAndPassword(email: string, password: string): Promise<Credentials> {
        try {
            const hashedPassword = await this.passwordsService.hashPassword(password);
            const user = {
                email,
                password: hashedPassword,
            } 
            const registeredUser = await this.usersRepository.createUser(user);
            const authToken = this.tokensService.createToken(registeredUser, 'authentication');
            return {token: authToken, user: registeredUser};
        } catch (error) {
            throw error;   
        }
    }

    async signinUserWithEmailAndPassword(email: string, password: string): Promise<Credentials> {
        try {
            const user = await this.usersRepository.getUserByEmail(email);
            const passwordsMatch = await this.passwordsService.comparePasswords(password, user.password);
            if (!passwordsMatch) {
                throw new Error('Wrong password');
            }
            const authToken = this.tokensService.createToken(user, 'authentication');
            return {token: authToken, user};
        } catch (error) {
            throw error;   
        }
    }

}