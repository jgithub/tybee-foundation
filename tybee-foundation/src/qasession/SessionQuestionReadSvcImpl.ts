import { PostgresConnectionProviderSvc } from "../postgres/PostgresConnectionProviderSvc";
import { SessionQuestion } from "./SessionQuestion";
import { SessionQuestionReadSvc } from "./SessionQuestionReadSvc";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`SessionQuestionReadSvcImpl`)

export class SessionQuestionReadSvcImpl implements SessionQuestionReadSvc {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  public async getAllQuestions(): Promise<SessionQuestion[]> {
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      let resultSet = await client.query("SELECT * FROM session_question ORDER BY order_weight DESC");
      LOG.debug(`determinetNextQuestionId(): resultSet.rows = ${d4l(resultSet.rows)}`);

      const results: SessionQuestion[] = resultSet.rows.map(row => {
        return {
          uuid: row.uuid,
          orderWeight: row.order_weight,
          phrase: row.phrase,
          audioFile: row.audio_file,
        } as SessionQuestion
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