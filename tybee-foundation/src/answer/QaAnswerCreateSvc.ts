import { QaAnswer } from "../qa/QaAnswer";

export interface QaAnswerCreateSvc {
  createAnswer(qaAnswer: QaAnswer): Promise<void>;
}