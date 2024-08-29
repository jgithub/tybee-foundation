export interface QaAnswer {
  uuid: string;
  entityId: number;
  questionUuid: string;
  reportedBeginAt: Date;
  reportedEndAt: Date;
  // TODO: What about filename?
}