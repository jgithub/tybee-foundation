import { SysConfigSvc } from "./SysConfigSvc";
import { BASE_PATH } from "../constant";

export class SysConfigSvcImpl implements SysConfigSvc {
  public getBasePath(): string {
    return BASE_PATH
  }

  public getControllerProps(): Object {
    return {
      BASE_PATH: this.getBasePath()
    }
  }

}