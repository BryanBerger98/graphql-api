import { PrismaClient } from '@prisma/client';
import express from 'express';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';
import gqlSchema from './gql-schema';
import GQLResolver from './interfaces/gql-resolver.interface';
import AuthMiddleware from './middlewares/auth.middleware';
import CorsMiddleware from './middlewares/cors.middleware';

export default class App {

    readonly app: express.Application;
    readonly port: number;
    constructor(resolvers: GQLResolver, port: number | undefined) {
      this.app = express();
      this.port = port ? port : 3000;
   
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(cookieParser());
      this.app.use(new CorsMiddleware().init());
      this.app.use(new AuthMiddleware().getUser);

      this.app.use('/graphql', graphqlHTTP((req, res, params) => {
        return {
          schema: gqlSchema,
          rootValue: resolvers,
          graphiql: true,
        }
      }));

    }
   
    public start(): void {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    }

}