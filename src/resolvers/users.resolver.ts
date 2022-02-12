import GQLResolver from "../interfaces/gql-resolver.interface";
import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";

import UsersService from "../services/users.service";
import User from "../interfaces/users/User.interface";

export default class UsersResolver implements GQLResolver {

    constructor(private usersService: UsersService) {
        this.getUsers = this.getUsers;
        this.getUserById = this.getUserById;
        this.createUser = this.createUser;
        this.updateUser = this.updateUser;
        this.deleteUser = this.deleteUser;
    }

    getUsers (): Promise<User[]> {
        return this.usersService.getUsers();
    }

    getUserById({id}: {id: number}): Promise<User> {
        return this.usersService.getUserById(id);
    }

    createUser({input}: {input: UserCreateInput}): Promise<User> {
        return this.usersService.createUser(input);
    }

    updateUser({input}: {input: UserUpdateInput}): Promise<User> {
        return this.usersService.updateUser(input);
    }

    deleteUser({id}: {id: number}): Promise<User> {
        return this.usersService.deleteUser(id);
    }

}