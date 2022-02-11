import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import gqlSchema from './gql-schema';
import GQLResolver from './interfaces/gql-resolver.interface';
import CorsMiddleware from './middlewares/cors.middleware';

export default class App {

    readonly app: express.Application;
    readonly port: number;
    constructor(resolvers: GQLResolver, port: number | undefined) {
      this.app = express();
      this.port = port ? port : 3000;
   
      this.initializeMiddlewares();

      this.app.use('/graphql', graphqlHTTP({
        schema: gqlSchema,
        rootValue: resolvers,
        graphiql: true,
      }));

    }
   
    private initializeMiddlewares(): void {
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(new CorsMiddleware().init());
    }
   
    public start(): void {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    }

}