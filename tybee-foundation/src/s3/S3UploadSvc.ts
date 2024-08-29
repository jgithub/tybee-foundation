export interface S3UploadSvc {
  uploadFileToS3(localFilePath: string, destinationFileInS3: string): Promise<void>;
}