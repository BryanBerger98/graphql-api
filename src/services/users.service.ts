import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";
import User from "../interfaces/users/User.interface";
import UsersRepository from "../repositories/users.repository";
import PasswordsService from "./passwords.service";

export default class UsersService {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService
    ) {}

    getUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.usersRepository.getUsers().then(resolve).catch(reject);
        });
    }

    getUserById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.usersRepository.getUserById(id).then(resolve).catch(reject);
        });
    }

    async createUser(newUser: UserCreateInput): Promise<User> {
        try {
            const password = newUser.password ? newUser.password : this.passwordsService.generatePassword();
            const hashedPassword = await this.passwordsService.hashPassword(password);
            const registeredUser = await this.usersRepository.createUser({...newUser, password: hashedPassword});
            return registeredUser;
        } catch (error) {
            throw error;
        }
    }

    updateUser(user: UserUpdateInput): Promise<User> {
        return new Promise((resolve, reject) => {
            this.usersRepository.updateUser(user).then(resolve).catch(reject);
        });
    }

    deleteUser(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.usersRepository.deleteUser(id).then(resolve).catch(reject);
        });
    }

}