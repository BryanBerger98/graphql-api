import GQLResolver from "../interfaces/gql-resolver.interface";
import UpdateUserInput from "../interfaces/update-user-input.interface";
import UserInput from "../interfaces/user-input.interface";
import User from "../interfaces/User.interface";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let users: User[] = [
    {
        id: 1,
        name: 'Chris',
        email: 'chris@evans.com'
    },
    {
        id: 2,
        name: 'Robert',
        email: 'robert@downey-jr.com'
    },
    {
        id: 3,
        name: 'Elizabeth',
        email: 'elizabeth@olsen.com'
    },
    {
        id: 4,
        name: 'Scarlett',
        email: 'scarlett@johansson.com'
    }
];

export const usersResolver: GQLResolver = {
    getUsers: (): Promise<User[]> => {
        return new Promise((resolve, reject) => {
            prisma.user.findMany().then(resolve).catch(reject);
        });
    },
    getUserById: ({id}: {id: number}): Promise<User> => {
        return new Promise((resolve, reject) => {
            prisma.user.findUnique({
                where: {id}
            }).then(user => {
                if (!user) {
                    return reject(new Error('This user does not exist'));
                }
                resolve(user);
            }).catch(reject);
        });
    },
    createUser: ({input}: {input: UserInput}): Promise<User> => {
        return new Promise((resolve, reject) => {
            prisma.user.create({
                data: input
            }).then(resolve).catch(reject);
        });
    },
    updateUser: ({input}: {input: UpdateUserInput}): Promise<User> => {
        return new Promise((resolve, reject) => {
            prisma.user.update({
                where: {id: input.id},
                data: {
                    email: input.email,
                    name: input.name
                }
            }).then(resolve).catch(reject);
        });
    },
    deleteUser: ({id}: {id: number}): Promise<User> => {
        return new Promise((resolve, reject) => {
            prisma.user.delete({
                where: {id}
            }).then(resolve).catch(reject);
        });
    }
};

function generateUserId(): number {
    const userIds = users.map(u => u.id);
    const maxId = Math.max(...userIds);
    const newId = maxId + 1;
    return newId;
}