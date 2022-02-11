import GQLResolver from "../interfaces/gql-resolver.interface";
import { usersResolver } from "./users.resolver";

export const gqlResolvers: GQLResolver = {
    ...usersResolver
}