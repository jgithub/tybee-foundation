import { Request, Response } from 'express';
import { BASE_PATH } from "../constant";
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
const LOG = getLogger(`UserSessionController`)

const controllerProps = {
  BASE_PATH: BASE_PATH
}

export class UserSessionController {
  // private userService: UserService;
  constructor(private readonly sysConfigSvc: SysConfigSvc) { }

  public async new(req: Request, res: Response): Promise<void> {
    res.render('user/session/new', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
  }

  public async create(req: Request, res: Response): Promise<void> {
    LOG.debug(`create(): Entering with req = ${d4l(req)}`)
    LOG.debug(`create(): Entering with req.body = ${d4l(req.body)}`)
    LOG.debug(`create(): Entering with req.query = ${d4l(req.query)}`)
    res.render('user/session/create', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
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