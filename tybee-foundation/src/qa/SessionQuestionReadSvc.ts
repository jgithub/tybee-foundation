import { SessionQuestion } from "./SessionQuestion";

export interface SessionQuestionReadSvc {
  getAllQuestions(): Promise<SessionQuestion[]>;
}