import { Request, Response } from 'express';
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
import { EntityCrudSvc } from '../entity/EntityCrudSvc';
const LOG = getLogger(`UserSessionController`)
import { BASE_PATH } from "../constant";
import { numberUtil } from '@jgithub/ts-gist-pile';


export class UserSessionController {
  // private userService: UserService;
  constructor(private readonly sysConfigSvc: SysConfigSvc, private readonly entityCrudSvc: EntityCrudSvc) { }

  public async new(req: Request, res: Response): Promise<void> {
    res.render('user/session/new', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
  }

  public async create(req: Request, res: Response): Promise<void> {
    LOG.debug(`create(): Entering with req = ${d4l(req)}`)
    LOG.debug(`create(): Entering with req.body = ${d4l(req.body)}`)
    LOG.debug(`create(): Entering with req.query = ${d4l(req.query)}`)

    const userId = numberUtil.tryAsNumber(req.body.username);
    const pin = req.body.password;

    const entity = await this.entityCrudSvc.getUserByIdAndPin(userId as number, pin);
    if (entity != null) {
      LOG.info(`create(): Found user entity = ${d4l(entity)}`)

      res.redirect(302, `${BASE_PATH}instructions`);
    } else {
      LOG.warn(`create(): Did NOT find user entity.`)

      res.render('user/session/new', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
    }

    // res.render('user/session/create', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
  }

  // Method to get a list of users
  public async signInWithUserIdAndPin(req: Request, res: Response): Promise<void> {
    // Example: Fetch users from a database (mocked here)
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ];
    
    res.status(200).json(users);
  }
}