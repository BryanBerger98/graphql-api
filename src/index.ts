import App from './app';
import config from './environment/env.config';
import { gqlResolvers } from './resolvers';

const app = new App(
  gqlResolvers,
  config.PORT,
);
 
app.start();