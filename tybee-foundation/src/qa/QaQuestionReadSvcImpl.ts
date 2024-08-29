import { NotFoundException } from "../exception/NotFoundException";
import { ProgrammerException } from "../exception/ProgrammerException";
import { PostgresConnectionProviderSvc } from "../postgres/PostgresConnectionProviderSvc";
import { QaQuestion } from "./QaQuestion";
import { QaQuestionReadSvc } from "./QaQuestionReadSvc";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`QaQuestionReadSvcImpl`)

export class QaQuestionReadSvcImpl implements QaQuestionReadSvc {
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  public async getQuestionByUuid(uuid: string): Promise<QaQuestion> {
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      let resultSet = await client.query("SELECT * FROM qa_question WHERE uuid = $1", [uuid]);
      LOG.debug(`getQuestionByUuid(): resultSet.rows = ${d4l(resultSet.rows)}`);

      if (resultSet.rows.length > 1) {
        LOG.error(`getQuestionByUuid(): Too many results.  Programmer error`);
        throw new ProgrammerException();
      }

      if (resultSet.rows.length > 0) {
        const row = resultSet.rows[0];
        const qaQuestion: QaQuestion = {
          uuid: row.uuid,
          sequence: row.sequence,
          phrase: row.phrase,
          audioFile: row.audio_file,
          audioOffsetBegin: row.audio_offset_begin,
          audioOffsetEnd: row.audio_offset_end,
        }
        return qaQuestion;
      }

      LOG.info(`getQuestionByUuid(): No rows found.  Throwing a NotFoundException`);
      throw new NotFoundException()
    } catch (err) {
      LOG.error(`getQuestionByUuid(): Problem executing SQL.  err = ${d4l(err)}`);
      throw err
    }
    finally {
      // Close the connection
      client.end();
    };
  }


  public async getAllQuestions(): Promise<QaQuestion[]> {
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {

      // Connect to the database
      await client.connect();

      let resultSet = await client.query("SELECT * FROM qa_question ORDER BY sequence ASC");
      LOG.debug(`getAllQuestions(): resultSet.rows = ${d4l(resultSet.rows)}`);

      const results: QaQuestion[] = resultSet.rows.map(row => {
        return {
          uuid: row.uuid,
          sequence: row.sequence,
          phrase: row.phrase,
          audioFile: row.audio_file,
          audioOffsetBegin: row.audio_offset_begin,
          audioOffsetEnd: row.audio_offset_end,
        } as QaQuestion
      });

      return results
    } catch (err) {
      LOG.error(`getAllQuestions(): Problem executing SQL.  err = ${d4l(err)}`);
      throw err
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}