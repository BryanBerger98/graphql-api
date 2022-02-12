import App from './app';
import envConfig from './environment/env.config';
import { gqlResolvers } from './resolvers';

const app = new App(
  gqlResolvers,
  envConfig.PORT,
);
 
app.start();