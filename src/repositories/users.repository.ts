import { PrismaClient } from "@prisma/client";
import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";
import User from "../interfaces/users/User.interface";

interface UserCreateInputWithPassword extends UserCreateInput {
    password: string;
}

export default class UsersRepository {

    constructor(
        private prisma: PrismaClient
    ) {}

    getUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.prisma.user.findMany().then(resolve).catch(reject);
        });
    }

    getUserById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.prisma.user.findUnique({
                where: {id}
            }).then(user => {
                if (!user) {
                    return reject(new Error('This user does not exist'));
                }
                resolve(user);
            }).catch(reject);
        });
    }

    getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.prisma.user.findUnique({
                where: {email}
            }).then(user => {
                if (!user) {
                    return reject(new Error('This user does not exist'));
                }
                resolve(user);
            }).catch(reject);
        });
    }

    createUser(newUser: UserCreateInputWithPassword): Promise<User> {
        return new Promise((resolve, reject) => {
            this.prisma.user.create({
                data: newUser
            }).then(resolve).catch(reject);
        });
    }

    updateUser(user: UserUpdateInput): Promise<User> {
        return new Promise((resolve, reject) => {
            this.prisma.user.update({
                where: {id: user.id},
                data: {
                    email: user.email,
                    name: user.name
                }
            }).then(resolve).catch(reject);
        });
    }

    deleteUser(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.prisma.user.delete({
                where: {id}
            }).then(resolve).catch(reject);
        });
    }

}