import 'dotenv/config'
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`AppRunner`)
import * as dotenv from "dotenv";
dotenv.config()
import container from './inversify.config'
import DI_TYPES from "./diTypes";


export class AppRunner {
  public async run(): Promise<boolean> {
    LOG.debug(`run(): Entering.  NODE_ENV = ${d4l(process.env.NODE_ENV)},  cwd = ${process.cwd()}`)
    const dateProviderService = container.get<DateProviderService>(DI_TYPES.DateProviderService);
    LOG.debug(`run(): Time at the tone is ${d4l(dateProviderService.getNow())}`)

    return true;
  }
}