import { AuthenticatedEntityProviderSvc } from "../auth/AuthenticatedEntityProviderSvc";
import { QaQuestion } from "../qa/QaQuestion";
import { AudioFileNamingSvc } from "./AudioFileNamingSvc";


export class AudioFileNamingSvcImpl implements AudioFileNamingSvc {
  constructor(private readonly authenticatedEntityProviderSvc: AuthenticatedEntityProviderSvc) { }

  public generateMicrophoneAudioFileName(qaQuestion: QaQuestion): string {
    return `entity/${this.authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId()}/answer-for-${this.authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId()}-to-${qaQuestion.sequence}-${qaQuestion.uuid}-${qaQuestion.phrase.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, "-")}.webm`;
  }
}