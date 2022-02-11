import GQLResolver from "../interfaces/gql-resolver.interface";
import UserInput from "../interfaces/user-input.interface";
import User from "../interfaces/User.interface";

const users: User[] = [
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
            if (!users || users && users.length === 0) {
                reject(new Error('No users registered'));
            }
            resolve(users);
        });
    },
    getUserById: ({id}: {id: number}): Promise<User> => {
        return new Promise((resolve, reject) => {
            const foundUser = users.find(user => user.id === id);
            if (!foundUser) {
                return reject('This user does not exist');
            };
            resolve(foundUser);
        });
    },
    createUser: ({input}: {input: UserInput}): Promise<User> => {
        return new Promise((resolve, reject) => {
            const newUser = {...input, id: generateUserId()};
            users.push(newUser);
            resolve(newUser);
        });
    },
    deleteUser: ({id}: {id: number}): Promise<User> => {
        return new Promise((resolve, reject) => {
            const foundUser = users.find((user, index) => {
                if (user.id === id) {
                    users.splice(index, 1);
                    return user;
                }
            });
            if (!foundUser) {
                return reject('This user does not exist');
            };
            resolve(foundUser);
        });
    }
};

function generateUserId(): number {
    const userIds = users.map(u => u.id);
    const maxId = Math.max(...userIds);
    const newId = maxId + 1;
    return newId;
}