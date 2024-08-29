import { Request, Response } from 'express';
import { getLogger, d4l, DateProviderService, booleanUtil } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
import { EntityCrudSvc } from '../entity/EntityCrudSvc';
const LOG = getLogger(`QaSessionController`)
import { AUDIO_UPLOAD_DIR, BASE_PATH, TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from "../constant";
import { numberUtil } from '@jgithub/ts-gist-pile';
import { TransparentAuthToken, TransparentAuthTokenAttr } from '../auth/TransparentAuthToken';
import { QaQuestionReadSvc } from './QaQuestionReadSvc';
import { S3UploadSvc } from '../s3/S3UploadSvc';



export class QaSessionController {
  // private userService: UserService;
  constructor(
    private readonly sysConfigSvc: SysConfigSvc,
    private readonly qaQuestionReadSvc: QaQuestionReadSvc,
    private readonly s3UploadSvc: S3UploadSvc
  ) { }

  public async show(req: Request, res: Response): Promise<void> {
    res.render('qa/show', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!', qaQuestions: await this.qaQuestionReadSvc.getAllQuestions() });
  }

  public async uploadMyAnswer(req: Request, res: Response): Promise<void> {
    LOG.debug(`uploadMyAnswer(): Entering with req = ${d4l(req)}`)
    
    const theFilesObject: any = req?.files;
    LOG.debug(`uploadMyAnswer(): theFilesObject = ${d4l(theFilesObject)}`)

    const questionUuid = req.body?.question_uuid;
    LOG.debug(`uploadMyAnswer(): questionUuid = ${d4l(req)}`)

    // Lookup the question to get the sequence number
    const qaQuestion = await this.qaQuestionReadSvc.getQuestionByUuid(questionUuid);
    LOG.debug(`uploadMyAnswer(): Found qaQuestion = ${d4l(qaQuestion)}`)

    const theAudioArray: Array<any> = theFilesObject?.audio;
    if (theAudioArray != null && theAudioArray[0] != null) {
      LOG.debug(`uploadMyAnswer(): Entering with theAudioArray[0] = ${d4l(theAudioArray[0])}`)
      const theFirstAudioObject = theAudioArray[0]
      LOG.debug(`uploadMyAnswer(): theFirstAudioObject = ${d4l(theFirstAudioObject)}`)

      const localAudioFilePath = theFirstAudioObject.path;
      
      if (booleanUtil.isTruelike(process.env.S3_UPLOADS_ENABLED)) {
        LOG.debug(`uploadMyAnswer(): S3 uploads are enabled, so will upload to s3.  localAudioFilePath = ${d4l(localAudioFilePath)}`);
        this.s3UploadSvc.uploadFileToS3(localAudioFilePath, 'test.webm');
      } else {
        LOG.info(`uploadMyAnswer(): S3 uploads are DISABLED, so skipping upload to s3 of localAudioFilePath = ${d4l(localAudioFilePath)}`);
      }
    }
  }
}