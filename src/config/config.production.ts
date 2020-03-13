import { Config } from './config.module';

const config: Config = {
  app: {
    port: 3100,
  },
  log: {
    prettyPrint: false,
    level: 'debug'
  },
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'prod-user',
    password: '123456',
    database: 'test',
  },
  graphql: {
    debug: false,
    playground: false,
  }
};

export default config;
