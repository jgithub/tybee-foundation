import 'dotenv/config'
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`AppRunner`)
import * as dotenv from "dotenv";
import container from './inversify.config'
import DI_TYPES from "./diTypes";
import express, { Express, Request, Response } from "express";
dotenv.config()


export class AppRunner {
  public async run(): Promise<boolean> {

    LOG.debug(`run(): Entering.  NODE_ENV = ${d4l(process.env.NODE_ENV)},  cwd = ${process.cwd()}`)
    const dateProviderService = container.get<DateProviderService>(DI_TYPES.DateProviderService);
    LOG.debug(`run(): Time at the tone is ${d4l(dateProviderService.getNow())}`)


    const app: Express = express();
    const port = process.env.PORT || 3000;
    
    app.use(express.static('public'))
    app.set('view engine', 'ejs');

    // TODO: Move this to routing definition
    app.get("/api/v1/healthcheck", (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'ok'}));
    });

    app.get('/', (req, res) => {
      res.render('index', { title: 'Hello, world!' });
    });

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    return true;
  }
}