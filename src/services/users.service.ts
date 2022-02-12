import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";
import User from "../interfaces/users/User.interface";
import UsersRepository from "../repositories/users.repository";

export default class UsersService {

    constructor(
        private usersRepository: UsersRepository
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

    createUser(newUser: UserCreateInput): Promise<User> {
        return new Promise((resolve, reject) => {
            this.usersRepository.createUser(newUser).then(resolve).catch(reject);
        });
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