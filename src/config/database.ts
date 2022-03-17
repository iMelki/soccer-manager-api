// import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig = (): PostgresConnectionOptions => ({

  // export const dbConfig : PostgresConnectionOptions = {
  type: 'postgres' as 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB,
  ssl: false,
  logging: false,
  // Tell TypeOrm where to look for the Migs & Entities when running Migs:
  entities: ['./dist/**/*.entity.js'],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  // dropSchema: true,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  migrations: ['./dist/data/migrations/**/*{.ts,.js}'],
  // migrations: [join(__dirname, '/data/migrations/**/*{.ts,.js}')],
  cli: {
    // Tell the CLI where to put the Migs after mig:gen cmd:
    migrationsDir: './src/data/migrations',
    // entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
    // migrationsDir: join(__dirname, '/data/migrations'),
    // entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  },
// };
});

export default dbConfig();
