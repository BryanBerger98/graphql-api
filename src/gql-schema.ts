import { buildSchema } from "graphql";

export default buildSchema(`

type User {
    id: Int!,
    name: String,
    email: String!,
    password: String!
}

input UserCreateInput {
    name: String,
    email: String!,
    password: String!
}

input UserUpdateInput {
    id: Int!,
    name: String,
    email: String
}

type Credentials {
    token: String!,
    user: User!
}

input CredentialsInput {
    email: String!,
    password: String!
}

type Query {
    getUsers: [User]
    getUserById(id: Int!): User
    getCurrentUser: User
}

type Mutation {
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    deleteUser(id: Int!): User
    signupUserWithEmailAndPassword(input: CredentialsInput!): Credentials
    signinUserWithEmailAndPassword(input: CredentialsInput!): Credentials
}

`);
