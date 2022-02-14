import User from "../users/User.interface";

export default interface Credentials {
    token: string,
    user: User
}