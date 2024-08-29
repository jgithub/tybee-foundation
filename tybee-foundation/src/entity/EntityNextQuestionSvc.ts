export interface EntityNextQuestionSvc {
  determineNextQuestionId(entityId: number): Promise<string /* uuid */>;
}