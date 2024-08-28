import { Request, Response } from 'express';
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
import { SysConfigSvc } from '../sysconfig/SysConfigSvc';
import { EntityCrudSvc } from '../entity/EntityCrudSvc';
const LOG = getLogger(`UserSessionController`)
import { BASE_PATH, TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from "../constant";
import { numberUtil } from '@jgithub/ts-gist-pile';
import { TransparentAuthToken, TransparentAuthTokenAttr } from '../auth/TransparentAuthToken';


export class UserSessionController {
  // private userService: UserService;
  constructor(private readonly sysConfigSvc: SysConfigSvc, private readonly entityCrudSvc: EntityCrudSvc, private readonly dateProviderService: DateProviderService) { }

  public async new(req: Request, res: Response): Promise<void> {
    res.render('user/session/new', { ...this.sysConfigSvc.getControllerProps(), title: 'Hello, world!' });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    LOG.debug(`delete(): Entering with req = ${d4l(req)}`)
    res.clearCookie(TRANSPARENT_AUTH_TOKEN_COOKIE_NAME);
    res.redirect(302, `${BASE_PATH}`);
  }

  public async create(req: Request, res: Response): Promise<void> {
    LOG.debug(`create(): Entering with req = ${d4l(req)}`)
    LOG.debug(`create(): Entering with req.body = ${d4l(req.body)}`)
    LOG.debug(`create(): Entering with req.query = ${d4l(req.query)}`)

    const userId = numberUtil.tryAsNumber(req.body.username);
    const pin = req.body.password;

    const entity = await this.entityCrudSvc.tryGetUserByIdAndPin(userId as number, pin);
    if (entity != null) {
      LOG.info(`create(): Found user entity = ${d4l(entity)}`)

      const secondsSinceEpoch = Math.floor(this.dateProviderService.getNow().getTime() / 1000);
      const transparentAuthTokenAttr: TransparentAuthTokenAttr = {
        userId: 1,
        secondsSinceEpoch: secondsSinceEpoch
      } as TransparentAuthTokenAttr;
      const transparentAuthToken: TransparentAuthToken = new TransparentAuthToken(transparentAuthTokenAttr)


      let options = {
        maxAge: 1000 * 60 * 60 * 6, // would expire after 6 hours
        httpOnly: false, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
      }

      LOG.info(`create(): Preparing to set ${TRANSPARENT_AUTH_TOKEN_COOKIE_NAME} cookie to = ${d4l(transparentAuthToken.toCompleteStringWithJitSha256Signature())}`)

      // Set cookie
      res.cookie(TRANSPARENT_AUTH_TOKEN_COOKIE_NAME, transparentAuthToken.toCompleteStringWithJitSha256Signature(), options)
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