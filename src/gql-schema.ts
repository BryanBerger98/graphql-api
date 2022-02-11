import { buildSchema } from "graphql";

export default buildSchema(`

type User {
    id: Int!,
    name: String!,
    email: String!
}

input UserInput {
    name: String!,
    email: String!
}

input UpdateUserInput {
    id: Int!,
    name: String,
    email: String
}

type Query {
    getUsers: [User]
    getUserById(id: Int!): User
}

type Mutation {
    createUser(input: UserInput): User
    updateUser(input: UpdateUserInput): User
    deleteUser(id: Int!): User
}

`);
