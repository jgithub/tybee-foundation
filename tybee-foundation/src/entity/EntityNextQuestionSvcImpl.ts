import { NotFoundException } from "../exception/NotFoundException";
import { PostgresConnectionProviderSvc } from "../postgres/PostgresConnectionProviderSvc";
import { EntityNextQuestionSvc } from "./EntityNextQuestionSvc";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`EntityNextQuestionSvcImpl`)

export class EntityNextQuestionSvcImpl implements EntityNextQuestionSvc {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  
  public async determinetNextQuestionId(entityId: number): Promise<string /* uuid */> {
    LOG.debug(`determinetNextQuestionId(): Entering with entityId = ${d4l(entityId)}`);

    const sql = `
WITH ordered_questions AS (
  SELECT *
  FROM qa_question
  ORDER BY order_weight DESC
),
answered_questions AS (
  SELECT question_uuid
  FROM qa_answer
  WHERE entity_id = $1
)
SELECT oq.*
FROM ordered_questions oq
LEFT JOIN answered_questions aq
ON oq.uuid = aq.question_uuid
WHERE aq.question_uuid IS NULL
LIMIT 1`;
  
    // Create a new client instance with connection details
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      let resultSet = await client.query(sql, [entityId]);
      LOG.debug(`determinetNextQuestionId(): resultSet.rows = ${d4l(resultSet.rows)}`);

      const questionUuid = resultSet.rows[0].uuid;
      return questionUuid
    } catch (err) {
      LOG.error(`determinetNextQuestionId(): Problem executing SQL.  err = ${d4l(err)}`);
    }
    finally {
      // Close the connection
      client.end();
    };
    throw new NotFoundException()
  }
}