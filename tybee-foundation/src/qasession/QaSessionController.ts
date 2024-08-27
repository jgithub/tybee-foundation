import { Request, Response } from 'express';
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
import { EntityCrudSvc } from '../entity/EntityCrudSvc';
const LOG = getLogger(`QaSessionController`)
import { BASE_PATH, TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from "../constant";
import { numberUtil } from '@jgithub/ts-gist-pile';
import { TransparentAuthToken, TransparentAuthTokenAttr } from '../auth/TransparentAuthToken';


export class QaSessionController {
  // private userService: UserService;
  constructor(private readonly sysConfigSvc: SysConfigSvc) { }

  public async show(req: Request, res: Response): Promise<void> {
    res.render('qasession/show', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
  }
}