import GQLResolver from "../interfaces/gql-resolver.interface";
import UserCreateInput from "../interfaces/users/user-create-input.interface";
import UserUpdateInput from "../interfaces/users/user-update-input.interface";

import UsersService from "../services/users.service";
import User from "../interfaces/users/User.interface";
import AuthService from "../services/auth.service";
import Credentials from "../interfaces/users/credentials.interface";
import CredentialsInput from "../interfaces/users/credentials-input.interface";

export default class AuthResolver implements GQLResolver {

    constructor(
      private authService: AuthService
    ) {
      this.signupUserWithEmailAndPassword = this.signupUserWithEmailAndPassword;
      this.signinUserWithEmailAndPassword = this.signinUserWithEmailAndPassword;
    }

    signupUserWithEmailAndPassword({input}: {input: CredentialsInput}): Promise<Credentials> {
      return this.authService.signupUserWithEmailAndPassword(input.email, input.password);
    }

    signinUserWithEmailAndPassword({input}: {input: CredentialsInput}): Promise<Credentials> {
      return this.authService.signinUserWithEmailAndPassword(input.email, input.password);
    }

}