import { getLogger, d4l } from '@jgithub/ts-gist-pile';
import { booleanUtil } from '@jgithub/ts-gist-pile';
import pg from 'pg';
import { Request, Response } from 'express';

export class RequestInfoController {
  public async ri(req: Request, res: Response): Promise<void> {
    // res.json({ dbReadTest: 'geek' });

    // Create a new client instance with connection details
    const client = new pg.Client({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
      ssl: booleanUtil.isTruelike(process.env.PGSSL)
    });

    // Connect to the database
    client.connect()
      .then(() => console.log('Connected to PostgreSQL'))
      .catch(err => console.error('Connection error', err.stack));

    // Example query
    client.query('SELECT NOW()')
      .then(resultSet => {
        const timeAtTheTone = resultSet.rows[0].now;
        console.log('timeAtTheTone', timeAtTheTone);
        res.json({"serverDatetime": timeAtTheTone});
      })
      .catch(err => {
        console.error('Query error', err.stack);
      })
      .finally(() => {
        // Close the connection
        client.end();
      });
  }
}