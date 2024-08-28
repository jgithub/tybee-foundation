import 'dotenv/config'
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`AppRunner`)
import * as dotenv from "dotenv";
import container from './inversify.config'
import DI_TYPES from "./diTypes";
import express, { Express, Request, Response } from "express";
dotenv.config()
import { BASE_PATH, TRANSPARENT_AUTH_TOKEN_COOKIE_NAME } from "./constant";
import bodyParser from "body-parser";
import { RouterBuilderSvc } from './route/RouterBuilderSvc';
import { SysConfigSvc } from './sysconfig/SysConfigSvc';
// import sassMiddleware from 'express-dart-sass';
import { AsyncLocalStorage } from 'async_hooks'
import cookieParser from 'cookie-parser';
import { TransparentAuthToken } from './auth/TransparentAuthToken';
import { RequestContext } from './request/RequestContext';
import { asyncLocalStorage } from './request/MyOnlyAsyncLocalStorage';
import { AuthenticatedEntityProviderSvcImpl } from './auth/AuthenticatedEntityProviderSvcImpl';
import { AuthenticatedEntityProviderSvc } from './auth/AuthenticatedEntityProviderSvc';

export class AppRunner {
  public async run(): Promise<boolean> {

    LOG.debug(`run(): Entering.  NODE_ENV = ${d4l(process.env.NODE_ENV)},  cwd = ${process.cwd()}`)
    const dateProviderService = container.get<DateProviderService>(DI_TYPES.DateProviderService);
    LOG.debug(`run(): Time at the tone is ${d4l(dateProviderService.getNow())}`)
    const routerBuilderSvc = container.get<RouterBuilderSvc>(DI_TYPES.RouterBuilderSvc);
    const authenticatedEntityProviderSvc = container.get<AuthenticatedEntityProviderSvc>(DI_TYPES.AuthenticatedEntityProviderSvc);


    const app: Express = express();
    const port = process.env.PORT || 3000;
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static('public'))
    app.set('view engine', 'ejs');



    app.use((req, res, next) => {
      LOG.debug(`run(): [middleware] Cookie processing with Entering with req = ${d4l(req)}`)
      LOG.debug(`run(): req.cookies = ${d4l(req.cookies)}`)

      const denormalizedCookieValue = req.cookies[TRANSPARENT_AUTH_TOKEN_COOKIE_NAME]
      LOG.debug(`run(): denormalizedCookieValue = ${d4l(denormalizedCookieValue)}`)
      const transparentAuthToken: TransparentAuthToken | undefined = denormalizedCookieValue ? TransparentAuthToken.parseFromString(denormalizedCookieValue) : undefined;
      
      const store = {}
      if (transparentAuthToken != null && transparentAuthToken.isValid(dateProviderService.getNow())) {
        LOG.debug(`run(): [VALID] transparentAuthToken = ${d4l(transparentAuthToken)}.  authenticatedEntityId = ${d4l(transparentAuthToken.userId)}`);
        (store as any).authenticatedEntityId = transparentAuthToken.userId
        LOG.debug(`run(): Now store = ${d4l(store)}`);
      }

      asyncLocalStorage.run(store, async () => {
        /* Some API Logic here*/
        const authenticatedEntityId = RequestContext.tryGetAuthenticatedEntityId()
        LOG.debug(`run(): RequestContext.tryGetAuthenticatedEntityId() = ${d4l(authenticatedEntityId)}`);
        next();
      });
    });

    const controllerProps = {
      BASE_PATH: BASE_PATH
    }

    const router = routerBuilderSvc.build();
    app.use(`${BASE_PATH}`, router);

    // TODO: Move this to routing definition
    app.get(`${BASE_PATH}api/v1/healthcheck`, (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ...controllerProps, message: 'ok'}));
    });

    app.get(`${BASE_PATH}`, (req: Request, res: Response) => {
      if (authenticatedEntityProviderSvc.tryGetAlreadyAuthenticatedEntityId() == null) {
        // NOT signed in
        res.redirect(302, `${BASE_PATH}user/session/new`);
      } else {
        res.redirect(302, `${BASE_PATH}qa`);
      }
    });


    app.get(`${BASE_PATH}instructions`, (req, res) => {
      res.render('instructions', { ...controllerProps, title: 'Hello, world!' });
    });

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    return true;
  }
}