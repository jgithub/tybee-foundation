import pg from 'pg';
import { PostgresConnectionProviderSvc } from './PostgresConnectionProviderSvc';
import { booleanUtil } from '@jgithub/ts-gist-pile';

export class PostgresConnectionProviderSvcImpl implements PostgresConnectionProviderSvc {
  public getConnection(): pg.Client {
    const client = new pg.Client({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
      ssl: booleanUtil.isTruelike(process.env.PGSSL)
    });
    return client
  }
}