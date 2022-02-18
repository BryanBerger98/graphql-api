export default interface UserCreateInput {
    name?: string | null;
    email: string;
    password?: string;
}

export type CreateUser = Required<Pick<UserCreateInput, 'email' | 'password'>>;