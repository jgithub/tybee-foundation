import 'dotenv/config'
import { d4l } from '@jgithub/ts-gist-pile';
import { getLogger } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`cli.ts`)
import * as dotenv from "dotenv";
dotenv.config()
import * as fs from 'fs';
import * as path from 'path';

export class DevRunner {
  public async run(): Promise<boolean> {
    LOG.debug(`run(): Entering.  cwd = ${process.cwd()}`)
    return true;
  }
}