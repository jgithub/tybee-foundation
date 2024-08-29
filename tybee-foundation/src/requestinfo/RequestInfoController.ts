import { Request, Response } from 'express';
import { PostgresConnectionProviderSvc } from '../postgres/PostgresConnectionProviderSvc';
import { AuthenticatedEntityProviderSvc } from '../auth/AuthenticatedEntityProviderSvc';
import { JsonObject } from '@jgithub/ts-gist-pile/dist/json/JsonObject';
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
import { EntityNextQuestionSvc } from '../entity/EntityNextQuestionSvc';
import { TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from '../constant';
const LOG = getLogger(`RequestInfoController`)

export class RequestInfoController {
  constructor(
    private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc,
    private readonly authenticatedEntityProviderSvc: AuthenticatedEntityProviderSvc,
    private readonly entityNextQuestionSvc: EntityNextQuestionSvc
  ) { }

  public async ri(req: Request, res: Response): Promise<void> {
    // Create a new client instance with connection details
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      // Example query
      const responseJsonBody: JsonObject = {}

      let resultSet = await client.query('SELECT NOW()')
      const serverDatetime = resultSet.rows[0].now;
      responseJsonBody["serverDatetime"] = serverDatetime;

      resultSet = await client.query('SELECT COUNT(*) as count FROM entity')
      const entityCount = Number(resultSet.rows[0].count);
      responseJsonBody["entityCount"] = entityCount;
      const authenticatedEntityId = this.authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId();
      responseJsonBody["authenticatedEntityId"] = authenticatedEntityId;
      if (authenticatedEntityId != null) {
        responseJsonBody["myNextQuestionUuid"] = await this.entityNextQuestionSvc.determineNextQuestionId(authenticatedEntityId);
      }
      const denormalizedCookieValue = req.cookies[TRANSPARENT_AUTH_TOKEN_COOKIE_NAME]
      responseJsonBody[`COOKIE_${TRANSPARENT_AUTH_TOKEN_COOKIE_NAME}`] = denormalizedCookieValue;

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