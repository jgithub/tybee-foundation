import { getLogger, d4l, JsonValue } from '@jgithub/ts-gist-pile';
import { Request, Response } from 'express';
import { PostgresConnectionProviderSvc } from '../postgres/PostgresConnectionProviderSvc';
const LOG = getLogger(`RequestInfoController`)

export class RequestInfoController {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  public async ri(req: Request, res: Response): Promise<void> {
    // Create a new client instance with connection details
    const client = this.postgressConnectionProviderSvc.getConnection();

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
      LOG.error(`ri(): Problem executing SQL.  err = ${d4l(err)}`);
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}