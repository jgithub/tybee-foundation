import { Container } from "inversify";
import DI_TYPES from "./diTypes";
import { DateProviderService } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from "./sysconfig/SysConfigSvc";
import { SysConfigSvcImpl } from "./sysconfig/SysConfigSvcImpl";
import { UserSessionController } from "./user/UserSessionController";
import { RouterBuilderSvcImpl } from "./route/RouterBuilderSvcImpl";
import { RouterBuilderSvc } from "./route/RouterBuilderSvc";

const container = new Container();
// Lower order services ^^^^^^^

const dateProviderService: DateProviderService = {
  getNow: () => new Date()
}

const sysConfigSvc: SysConfigSvc = new SysConfigSvcImpl();
const userSessionController = new UserSessionController(sysConfigSvc);
const routerBuilderSvc = new RouterBuilderSvcImpl(userSessionController);

// Higher Order Services vvvvvvvvv

container.bind<DateProviderService>(DI_TYPES.DateProviderService).toConstantValue(dateProviderService)
container.bind<SysConfigSvc>(DI_TYPES.SysConfigSvc).toConstantValue(sysConfigSvc)
container.bind<UserSessionController>(DI_TYPES.UserSessionController).toConstantValue(userSessionController)
container.bind<RouterBuilderSvc>(DI_TYPES.RouterBuilderSvc).toConstantValue(routerBuilderSvc)

export default container;
