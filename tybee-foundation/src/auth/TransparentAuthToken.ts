import cloneDeep = require("lodash.clonedeep")
import * as crypto from "crypto";

export class TransparentAuthToken implements TransparentAuthTokenAttr {
  private readonly attr: TransparentAuthTokenAttr;

  private static readonly salt = 'salty'

  constructor(attr: TransparentAuthTokenAttr) {
    this.attr = cloneDeep(attr)
  }

  public get secondsSinceEpoch(): number {
    return this.attr.secondsSinceEpoch;
  }

  public get userId(): number {
    return this.attr.userId;
  } 

  public get sha256Signature(): string {
    return this.attr.sha256Signature;
  } 

  public get compositeDataToSign(): string {
    return `${this.attr.userId}.${this.attr.secondsSinceEpoch}`
  }

  public generateJitSha256Signature(): string {
    const signature = crypto
      .createHmac('sha256', TransparentAuthToken.salt)
      .update(this.compositeDataToSign)
      .digest('hex');
    return signature;
  } 

  public toCompleteStringWithJitSha256Signature(): string {
    return `${this.compositeDataToSign}.${this.generateJitSha256Signature()}`
  } 

  public cloneWithOverrides(overrides: Partial<TransparentAuthTokenAttr>): TransparentAuthToken {
    return new TransparentAuthToken({ ...this.attr, ...overrides });
  }

  public doesMatch(another: TransparentAuthToken): boolean {
    return JSON.stringify(this.attr) === JSON.stringify(another.attr);
  }

  public static parseFromString(str: string): TransparentAuthToken {
    const parts = str.split('.');
    return new TransparentAuthToken({
      userId: parseInt(parts[0] as string),
      secondsSinceEpoch: parseInt(parts[1] as string),
      sha256Signature: parts[2] as string
    });
  }
}

export interface TransparentAuthTokenAttr {
  secondsSinceEpoch: number;
  userId: number;
  sha256Signature: string;
}