import 'dotenv/config'
import { getLogger } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`cli.ts`)
import * as dotenv from "dotenv";
dotenv.config()

export class TestDevCli {
  public async run(): Promise<boolean> {
    LOG.debug(`run(): Entering.  cwd = ${process.cwd()}`)
    return true;
  }
}