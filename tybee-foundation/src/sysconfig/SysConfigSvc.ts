import { JsonValue } from "@jgithub/ts-gist-pile";

export interface SysConfigSvc {
  getBasePath(): string;
  getControllerProps(): Object;
}