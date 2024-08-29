import { PostgresConnectionProviderSvc } from "../postgres/PostgresConnectionProviderSvc";
import { QaAnswer } from "../qa/QaAnswer";
import { QaAnswerCreateSvc } from "./QaAnswerCreateSvc";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`QaAnswerCreateSvcImpl`)


/**
 * This is the postgres implementation of the QaAnswerCreateSvc.
 */

export class QaAnswerCreateSvcImpl implements QaAnswerCreateSvc {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  public async createAnswer(qaAnswer: QaAnswer): Promise<void>{
    LOG.debug(`createAnswer(): Entering with qaAnswer = ${d4l(qaAnswer)}`);

    const client = this.postgressConnectionProviderSvc.getConnection();

    const sql = `INSERT INTO qa_answer (entity_id, qa_question_uuid, reported_begin_at, reported_end_at) VALUES ($1, $2, $3, $4)`
    const numberedParams = [qaAnswer.entityId, qaAnswer.questionUuid, qaAnswer.reportedBeginAt, qaAnswer.reportedEndAt];
    LOG.debug(`createAnswer(): Will insert row using sql = ${d4l(sql)},  and numberedParams = ${d4l(numberedParams)}`);

    try {

      // Connect to the database
      await client.connect();
      await client.query(sql, numberedParams);

      LOG.info(`createAnswer(): Inserted qaAnswer = ${d4l(qaAnswer)}`);
    } catch (err) {
      LOG.error(`createAnswer(): Problem executing SQL.  err = ${d4l(err)}`);
      throw err
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}