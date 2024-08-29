import { QaQuestion } from "../qa/QaQuestion";

export interface AudioFileNamingSvc {
  generateMicrophoneAudioFileName(qaQuestion: QaQuestion): string;
}