import { Container } from "inversify";
import DI_TYPES from "./diTypes";
import { DateProviderService } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from "./sysconfig/SysConfigSvc";
import { SysConfigSvcImpl } from "./sysconfig/SysConfigSvcImpl";
import { UserSessionController } from "./user/UserSessionController";
import { RouterBuilderSvcImpl } from "./route/RouterBuilderSvcImpl";
import { RouterBuilderSvc } from "./route/RouterBuilderSvc";
import { RequestInfoController } from "./requestinfo/RequestInfoController";
import { PostgresConnectionProviderSvcImpl } from "./postgres/PostgresConnectionProviderSvcImpl";
import { EntityCrudSvcImpl } from "./entity/EntityCrudSvcImpl";
import { AuthenticatedEntityProviderSvcImpl } from "./auth/AuthenticatedEntityProviderSvcImpl";
import { QaSessionController } from "./qa/QaSessionController";
import { EntityNextQuestionSvcImpl } from "./entity/EntityNextQuestionSvcImpl";
import { QaQuestionReadSvcImpl } from "./qa/QaQuestionReadSvcImpl";
import { AuthenticatedEntityProviderSvc } from "./auth/AuthenticatedEntityProviderSvc";
import { S3UploadSvcImpl } from "./s3/S3UploadSvcImpl";
import { AudioFileNamingSvcImpl } from "./audio/AudioFileNamingSvcImpl";
import { QaAnswerCreateSvcImpl } from "./answer/QaAnswerCreateSvcImpl";

const container = new Container();
// Lower order services ^^^^^^^

const dateProviderService: DateProviderService = {
  getNow: () => new Date()
}

const sysConfigSvc: SysConfigSvc = new SysConfigSvcImpl();
const postgressConnectionProviderSvc = new PostgresConnectionProviderSvcImpl();
const entityCrudSvc = new EntityCrudSvcImpl(postgressConnectionProviderSvc);
const userSessionController = new UserSessionController(sysConfigSvc, entityCrudSvc, dateProviderService);
const authenticatedEntityProviderSvc = new AuthenticatedEntityProviderSvcImpl();
const qaQuestionsReadSvc = new QaQuestionReadSvcImpl(postgressConnectionProviderSvc);
const s3UploadSvc = new S3UploadSvcImpl();
const audioFileNamingSvc = new AudioFileNamingSvcImpl(authenticatedEntityProviderSvc);
const qaAnswerCreateSvc = new QaAnswerCreateSvcImpl(postgressConnectionProviderSvc);
const qaSessionController = new QaSessionController(sysConfigSvc, qaQuestionsReadSvc, s3UploadSvc, audioFileNamingSvc, authenticatedEntityProviderSvc, qaAnswerCreateSvc);
const entityNextQuestionSvc = new EntityNextQuestionSvcImpl(postgressConnectionProviderSvc);
const requestInfoController = new RequestInfoController(postgressConnectionProviderSvc, authenticatedEntityProviderSvc, entityNextQuestionSvc);
const routerBuilderSvc = new RouterBuilderSvcImpl(userSessionController, requestInfoController, qaSessionController);
// Higher Order Services vvvvvvvvv

container.bind<DateProviderService>(DI_TYPES.DateProviderService).toConstantValue(dateProviderService)
container.bind<RouterBuilderSvc>(DI_TYPES.RouterBuilderSvc).toConstantValue(routerBuilderSvc)
container.bind<AuthenticatedEntityProviderSvc>(DI_TYPES.AuthenticatedEntityProviderSvc).toConstantValue(authenticatedEntityProviderSvc)
// container.bind<SysConfigSvc>(DI_TYPES.SysConfigSvc).toConstantValue(sysConfigSvc)
// container.bind<UserSessionController>(DI_TYPES.UserSessionController).toConstantValue(userSessionController)
// container.bind<RequestInfoController>(DI_TYPES.RequestInfoController).toConstantValue(requestInfoController)

export default container;
