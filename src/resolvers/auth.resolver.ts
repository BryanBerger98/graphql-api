import GQLResolver from "../interfaces/gql-resolver.interface";
import AuthService from "../services/auth.service";
import Credentials from "../interfaces/auth/credentials.interface";
import CredentialsInput from "../interfaces/auth/credentials-input.interface";
import GQLContext from "../interfaces/gql-context.interface";
import User from "../interfaces/users/User.interface";

export default class AuthResolver implements GQLResolver {

    constructor(
      private authService: AuthService
    ) {
      this.signupUserWithEmailAndPassword = this.signupUserWithEmailAndPassword;
      this.signinUserWithEmailAndPassword = this.signinUserWithEmailAndPassword;
      this.getCurrentUser = this.getCurrentUser;
    }

    signupUserWithEmailAndPassword({input}: {input: CredentialsInput}): Promise<Credentials> {
      return this.authService.signupUserWithEmailAndPassword(input.email, input.password);
    }

    async signinUserWithEmailAndPassword({input}: {input: CredentialsInput}, context: GQLContext): Promise<Credentials> {
      const credentials = await this.authService.signinUserWithEmailAndPassword(input.email, input.password)
      context.res.cookie('token', credentials.token);
      return credentials;
    }

    getCurrentUser({}, context: GQLContext): User {
      if (context.user) {
        return context.user;
      }
      throw new Error('Not authenticated');
    }

}