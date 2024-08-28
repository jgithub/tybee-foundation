import { Request, Response } from 'express';
import { getLogger, d4l, DateProviderService, booleanUtil } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
import { EntityCrudSvc } from '../entity/EntityCrudSvc';
const LOG = getLogger(`QaSessionController`)
import { AUDIO_UPLOAD_DIR, BASE_PATH, TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from "../constant";
import { numberUtil } from '@jgithub/ts-gist-pile';
import { TransparentAuthToken, TransparentAuthTokenAttr } from '../auth/TransparentAuthToken';
import { QaQuestionReadSvc } from './QaQuestionReadSvc';
// import { S3 } from 'aws-sdk';
// const AWS = import('aws-sdk');
// import * as AWS from 'aws-sdk';
// const S3 = AWS.S3;
import S3 from 'aws-sdk/clients/s3';
import * as fs from 'fs';


export class QaSessionController {
  // private userService: UserService;
  constructor(
    private readonly sysConfigSvc: SysConfigSvc,
    private readonly qaQuestionReadSvc: QaQuestionReadSvc
  ) { }

  public async show(req: Request, res: Response): Promise<void> {
    res.render('qa/show', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!', qaQuestions: await this.qaQuestionReadSvc.getAllQuestions() });
  }

  public async uploadMyAnswer(req: Request, res: Response): Promise<void> {
    LOG.debug(`uploadMyAnswer(): Entering with req = ${d4l(req)}`)
    
    const theFilesObject: any = req?.files;
    const theAudioArray: Array<any> = theFilesObject?.audio;
    if (theAudioArray != null && theAudioArray[0] != null) {
      LOG.debug(`uploadMyAnswer(): Entering with theAudioArray[0] = ${d4l(theAudioArray[0])}`)
      const theFirstAudioObject = theAudioArray[0]
      LOG.debug(`uploadMyAnswer(): theFirstAudioObject = ${d4l(theFirstAudioObject)}`)



      const uploadServerFileToS3 = async (filePath: string, destinationFileInS3: string) => {
        const fileContent = fs.readFileSync(filePath);
      
        const params = {
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: destinationFileInS3, // File name you want to save as in S3
          Body: fileContent,
        };
      
        const s3 = new S3({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        try {
          const data = await s3.upload(params).promise();
          console.log(`File uploaded successfully. ${data.Location}`);
        } catch (err) {
          console.error(`Error uploading file: ${err}`);
        }
      };

      const localAudioFilePath = theFirstAudioObject.path;
      
      if (booleanUtil.isTruelike(process.env.S3_UPLOADS_ENABLED)) {
        uploadServerFileToS3(localAudioFilePath, 'test.webm');
      }

      // Access the binary data of the uploaded file
      // const fileBuffer = theFirstAudioObject.buffer;

      // Example: Print the binary data (this will print a Buffer)
      // console.log(fileBuffer);
    }
  }
}