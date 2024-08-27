import { getLogger, d4l, JsonValue } from '@jgithub/ts-gist-pile';
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

    try {

      // Connect to the database
      await client.connect();

      // Example query
      const responseJsonBody: JsonValue = {}

      let resultSet = await client.query('SELECT NOW()')
      const serverDatetime = resultSet.rows[0].now;
      responseJsonBody["serverDatetime"] = serverDatetime;

      resultSet = await client.query('SELECT COUNT(*) as count FROM entity')
      const entityCount = Number(resultSet.rows[0].count);
      responseJsonBody["entityCount"] = entityCount;

      res.json(responseJsonBody);
    } catch (err) {
      console.error('Query error', err.stack);
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}