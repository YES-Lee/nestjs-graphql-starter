import * as path from 'path';
import { Config } from './config.module';

const config: Config = {
  app: {
    version: '0.1.1',
    port: 3001,
  },
  log: {
    enabled: true,
    timestamp: true,
    useLevelLabels: true,
    prettyPrint: true,
    level: 'info',
    path: path.resolve(__dirname, '../app.log'),
  },
  graphql: {
    debug: true,
    playground: true,
  },
};

export default config;
