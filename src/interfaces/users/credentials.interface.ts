import User from "./User.interface";

export default interface Credentials {
    token: string,
    user: User
}