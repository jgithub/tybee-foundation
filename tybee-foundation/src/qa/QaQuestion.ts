export interface QaQuestion {
  uuid: string;
  phrase: string;
  sequence: number;
  audioFile: string;
  audioOffsetBegin: number;
  audioOffsetEnd: number;
}