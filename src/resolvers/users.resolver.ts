import GQLResolver from "../interfaces/gql-resolver.interface";
import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";

import UsersService from "../services/users.service";
import User from "../interfaces/users/User.interface";
import GQLContext from "../interfaces/gql-context.interface";

export default class UsersResolver implements GQLResolver {

    constructor(private usersService: UsersService) {
        this.getUsers = this.getUsers;
        this.getUserById = this.getUserById;
        this.createUser = this.createUser;
        this.updateUser = this.updateUser;
        this.deleteUser = this.deleteUser;
    }

    getUsers({}, context: GQLContext): Promise<User[]> {
        if (!context || context && !context.user) {
            throw new Error('Forbidden');
        }
        return this.usersService.getUsers();
    }

    getUserById({id}: {id: number}, context: GQLContext): Promise<User> {
        if (!context || context && !context.user) {
            throw new Error('Forbidden');
        }
        return this.usersService.getUserById(id);
    }

    createUser({input}: {input: UserCreateInput}, context: GQLContext): Promise<User> {
        if (!context || context && !context.user) {
            throw new Error('Forbidden');
        }
        return this.usersService.createUser(input);
    }

    updateUser({input}: {input: UserUpdateInput}, context: GQLContext): Promise<User> {
        if (!context || context && !context.user) {
            throw new Error('Forbidden');
        }
        return this.usersService.updateUser(input);
    }

    deleteUser({id}: {id: number}, context: GQLContext): Promise<User> {
        if (!context || context && !context.user) {
            throw new Error('Forbidden');
        }
        return this.usersService.deleteUser(id);
    }

}