export default interface UserCreateInput {
    name?: string | null;
    email: string;
    password?: string;
}