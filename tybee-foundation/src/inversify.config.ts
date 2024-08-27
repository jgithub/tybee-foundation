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
import { QaSessionController } from "./qasession/QaSessionController";

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
const qaSessionController = new QaSessionController(sysConfigSvc);

const requestInfoController = new RequestInfoController(postgressConnectionProviderSvc, authenticatedEntityProviderSvc);
const routerBuilderSvc = new RouterBuilderSvcImpl(userSessionController, requestInfoController, qaSessionController);

// Higher Order Services vvvvvvvvv

container.bind<DateProviderService>(DI_TYPES.DateProviderService).toConstantValue(dateProviderService)
container.bind<SysConfigSvc>(DI_TYPES.SysConfigSvc).toConstantValue(sysConfigSvc)
container.bind<UserSessionController>(DI_TYPES.UserSessionController).toConstantValue(userSessionController)
container.bind<RequestInfoController>(DI_TYPES.RequestInfoController).toConstantValue(requestInfoController)
container.bind<RouterBuilderSvc>(DI_TYPES.RouterBuilderSvc).toConstantValue(routerBuilderSvc)

export default container;
