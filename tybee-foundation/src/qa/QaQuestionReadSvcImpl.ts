import { PostgresConnectionProviderSvc } from "../postgres/PostgresConnectionProviderSvc";
import { QaQuestion } from "./QaQuestion";
import { QaQuestionReadSvc } from "./QaQuestionReadSvc";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`QaQuestionReadSvcImpl`)

export class QaQuestionReadSvcImpl implements QaQuestionReadSvc {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  public async getAllQuestions(): Promise<QaQuestion[]> {
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      let resultSet = await client.query("SELECT * FROM qa_question ORDER BY order_weight ASC");
      LOG.debug(`determinetNextQuestionId(): resultSet.rows = ${d4l(resultSet.rows)}`);

      const results: QaQuestion[] = resultSet.rows.map(row => {
        return {
          uuid: row.uuid,
          orderWeight: row.order_weight,
          phrase: row.phrase,
          audioFile: row.audio_file,
        } as QaQuestion
      });

      return results
    } catch (err) {
      LOG.error(`getAllQuestions(): Problem executing SQL.  err = ${d4l(err)}`);
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}