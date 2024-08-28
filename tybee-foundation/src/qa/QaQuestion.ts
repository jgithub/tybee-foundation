export interface QaQuestion {
  uuid: string;
  phrase: string;
  orderWeight: number;
  audioFile: string;
  audioOffsetBegin: number;
  audioOffsetEnd: number;
}