import 'dotenv/config'
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`AppRunner`)
import * as dotenv from "dotenv";
import container from './inversify.config'
import DI_TYPES from "./diTypes";
import express, { Express, Request, Response } from "express";
dotenv.config()
import { BASE_PATH } from "./constant";
import bodyParser from "body-parser";
import router from './route/route';
// import sassMiddleware from 'express-dart-sass';

export class AppRunner {
  public async run(): Promise<boolean> {

    LOG.debug(`run(): Entering.  NODE_ENV = ${d4l(process.env.NODE_ENV)},  cwd = ${process.cwd()}`)
    const dateProviderService = container.get<DateProviderService>(DI_TYPES.DateProviderService);
    LOG.debug(`run(): Time at the tone is ${d4l(dateProviderService.getNow())}`)


    const app: Express = express();
    const port = process.env.PORT || 3000;
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'))
    app.set('view engine', 'ejs');

    // app.use(express.json())
    
    // app.use(
    //   sass.middleware({
    //       src: __dirname + '/sass', //where the sass files are
    //       dest: __dirname + '/public', //where css should go
    //       debug: true // obvious
    //   })
    // );

    const everywhereConfig = {
      BASE_PATH: BASE_PATH
    }


    app.use(`${BASE_PATH}`, router);

    // TODO: Move this to routing definition
    app.get(`${BASE_PATH}api/v1/healthcheck`, (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ...everywhereConfig, message: 'ok'}));
    });

    app.get(`${BASE_PATH}`, (req: Request, res: Response) => {
      res.redirect(302, `${BASE_PATH}user/session/new`);
    });

    // app.get(`${BASE_PATH}user/session/new`, (req, res) => {
    //   res.render('user/session/new', { ...everywhereConfig, title: 'Hello, world!' });
    // });

    

    app.get(`${BASE_PATH}instructions`, (req, res) => {
      res.render('instructions', { ...everywhereConfig, title: 'Hello, world!' });
    });

    app.post(`${BASE_PATH}user/session/create`, (req, res) => {
      LOG.debug(`run(): [user/session/create] Entering with req = ${d4l(req)}`)
      LOG.debug(`run(): [user/session/create] Entering with req.body = ${d4l(req.body)}`)
      LOG.debug(`run(): [user/session/create] Entering with req.query = ${d4l(req.query)}`)
      res.render('user/session/create', { ...everywhereConfig, title: 'Hello, world!' });
    });

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    return true;
  }
}