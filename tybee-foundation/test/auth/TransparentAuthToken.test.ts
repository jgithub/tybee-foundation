import { expect } from 'chai';
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
import container from '../../src/inversify.config'
import DI_TYPES from "../../src/diTypes";
import { TransparentAuthToken, TransparentAuthTokenAttr } from "../../src/auth/TransparentAuthToken";

describe('TransparentAuthToken', () => {
  it('works on epoch', () => {
    const transparentAuthTokenAttr: TransparentAuthTokenAttr = {
      userId: 1,
      secondsSinceEpoch: 0
    } as TransparentAuthTokenAttr;
    const transparentAuthToken: TransparentAuthToken = new TransparentAuthToken(transparentAuthTokenAttr)
    expect(transparentAuthToken.generateJitSha256Signature()).to.equal("336e30e5880c48f442cd73963bcfb8976f96a1ae386d1f2deaa6fe66ce710583")
    expect(transparentAuthToken.toCompleteStringWithJitSha256Signature()).to.equal("1.0.336e30e5880c48f442cd73963bcfb8976f96a1ae386d1f2deaa6fe66ce710583")
    const parsedToken: TransparentAuthToken = TransparentAuthToken.parseFromString(transparentAuthToken.toCompleteStringWithJitSha256Signature())
    expect(parsedToken.toCompleteStringWithJitSha256Signature()).to.equal(transparentAuthToken.toCompleteStringWithJitSha256Signature())
  })  

  it('works on now-a-days', () => {
    const transparentAuthTokenAttr: TransparentAuthTokenAttr = {
      userId: 1,
      secondsSinceEpoch: 1724770765
    } as TransparentAuthTokenAttr;
    const transparentAuthToken: TransparentAuthToken = new TransparentAuthToken(transparentAuthTokenAttr)
    expect(transparentAuthToken.generateJitSha256Signature()).to.equal("df4b0f79cfeb9920a64f9732216b5c1a016149355f65932ebc16396b5bf1d376")
    expect(transparentAuthToken.toCompleteStringWithJitSha256Signature()).to.equal("1.1724770765.df4b0f79cfeb9920a64f9732216b5c1a016149355f65932ebc16396b5bf1d376")
    const parsedToken: TransparentAuthToken = TransparentAuthToken.parseFromString(transparentAuthToken.toCompleteStringWithJitSha256Signature())
    expect(parsedToken.toCompleteStringWithJitSha256Signature()).to.equal(transparentAuthToken.toCompleteStringWithJitSha256Signature())
  })  
})
