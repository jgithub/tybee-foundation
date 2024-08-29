import { AuthenticatedEntityProviderSvc } from "../auth/AuthenticatedEntityProviderSvc";
import { QaQuestion } from "../qa/QaQuestion";
import { AudioFileNamingSvc } from "./AudioFileNamingSvc";


function pad2(n: any) { return n < 10 ? '0' + n : n }

export class AudioFileNamingSvcImpl implements AudioFileNamingSvc {
  constructor(private readonly authenticatedEntityProviderSvc: AuthenticatedEntityProviderSvc) { }

  public generateMicrophoneAudioFileName(qaQuestion: QaQuestion): string {
    const date = new Date();
    const YYYYMMDDHHMMSS = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    return `entity/${this.authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId()}/answer-by-e${this.authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId()}-for-q${qaQuestion.sequence}-${qaQuestion.uuid}-${qaQuestion.phrase.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, "-")}-${YYYYMMDDHHMMSS}.webm`;
  }
}