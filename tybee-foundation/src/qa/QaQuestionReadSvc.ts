import { QaQuestion } from "./QaQuestion";

export interface QaQuestionReadSvc {
  getAllQuestions(): Promise<QaQuestion[]>;
}