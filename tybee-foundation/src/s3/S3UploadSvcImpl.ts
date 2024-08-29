// import { S3 } from 'aws-sdk';
// const AWS = import('aws-sdk');
// import * as AWS from 'aws-sdk';
// const S3 = AWS.S3;
import S3 from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import { S3UploadSvc } from './S3UploadSvc';
import { getLogger, d4l, booleanUtil } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`S3UploadSvcImpl`)

export class S3UploadSvcImpl implements S3UploadSvc {
  public async uploadFileToS3(localFilePath: string, destinationFileInS3: string): Promise<void> {
    if (!booleanUtil.isTruelike(process.env.S3_UPLOADS_ENABLED)) {
      LOG.notice(`uploadFileToS3(): S3 uploads are DISABLED, so skipping upload to s3 of localFilePath = ${d4l(localFilePath)}`);
      return
    }
    LOG.debug(`uploadFileToS3(): S3 uploads are enabled, so will upload to s3.  localFilePath = ${d4l(localFilePath)},  destinationFileInS3 = ${d4l(destinationFileInS3)}`);


    const fileContent = fs.readFileSync(localFilePath);

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
      LOG.debug(`uploadFileToS3(): File uploaded successfully. ${data.Location}`);
    } catch (err) {
      LOG.error(`uploadFileToS3(): Error uploading file: ${err}`);
      throw err
    }
  }
}