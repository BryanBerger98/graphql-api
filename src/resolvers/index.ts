import { PrismaClient } from "@prisma/client";
import GQLResolver from "../interfaces/gql-resolver.interface";
import UsersRepository from "../repositories/users.repository";
import AuthService from "../services/auth.service";
import PasswordsService from "../services/passwords.service";
import TokensService from "../services/tokens.service";
import UsersService from "../services/users.service";
import AuthResolver from "./auth.resolver";
import UsersResolver from "./users.resolver";

const prisma = new PrismaClient();

// Side services
const tokensService = new TokensService();
const passwordsService = new PasswordsService();

// Repositories
const usersRepository = new UsersRepository(prisma);

// Services
const usersService = new UsersService(usersRepository, passwordsService);
const authService = new AuthService(usersRepository, passwordsService, tokensService);

// Resolvers
const usersResolver = new UsersResolver(usersService);
const authResolver = new AuthResolver(authService);

export const gqlResolvers: GQLResolver = {
    ...usersResolver,
    ...authResolver
}