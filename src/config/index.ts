import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dbConfig from './database';

interface iConfig {
  port: number;
  database: PostgresConnectionOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
}

export default (): Partial<iConfig> => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  keys: {
    privateKey: process.env.PRIVATE_KEY
      ? process.env.PRIVATE_KEY.replace(/\\n/gm, '\n')
      : '',
    publicKey: process.env.PUBLIC_KEY
      ? process.env.PUBLIC_KEY.replace(/\\n/gm, '\n')
      : '',
  },
  database: dbConfig,
});
