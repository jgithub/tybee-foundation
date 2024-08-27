import pg from 'pg';

export interface PostgresConnectionProviderSvc {
  getConnection(): pg.Client;
}