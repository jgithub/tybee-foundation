export interface SessionQuestion {
  uuid: string;
  phrase: string;
  orderWeight: number;
  audioFile: string;
  audioOffsetBegin: number;
  audioOffsetEnd: number;
}