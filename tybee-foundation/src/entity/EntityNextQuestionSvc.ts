export interface EntityNextQuestionSvc {
  determinetNextQuestionId(entityId: number): Promise<string /* uuid */>;
}