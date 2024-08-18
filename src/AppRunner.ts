import 'dotenv/config'
import { d4l } from '@jgithub/ts-gist-pile';
import { getLogger } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`AppRunner`)
import * as dotenv from "dotenv";
dotenv.config()
import * as fs from 'fs';
import * as path from 'path';
import container from './inversify.config'
import DI_TYPES from "./diTypes";


export class AppRunner {
  public async run(): Promise<boolean> {
    LOG.debug(`run(): Entering.  NODE_ENV = ${d4l(process.env.NODE_ENV)},  cwd = ${process.cwd()}`)
    return true;
  }
}