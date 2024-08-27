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
    expect(transparentAuthToken.generateJitSha256Signature()).to.equal("d47acdb7fa3fe3b121f5afd77578a15875fceff8eb0ada46ed7d9316368b7b46")
    expect(transparentAuthToken.toCompleteStringWithJitSha256Signature()).to.equal("1.0.d47acdb7fa3fe3b121f5afd77578a15875fceff8eb0ada46ed7d9316368b7b46")
    const parsedToken: TransparentAuthToken = TransparentAuthToken.parseFromString(transparentAuthToken.toCompleteStringWithJitSha256Signature())
    expect(parsedToken.toCompleteStringWithJitSha256Signature()).to.equal(transparentAuthToken.toCompleteStringWithJitSha256Signature())
  })  

  it('works on now-a-days', () => {
    const transparentAuthTokenAttr: TransparentAuthTokenAttr = {
      userId: 1,
      secondsSinceEpoch: 1724770765
    } as TransparentAuthTokenAttr;
    const transparentAuthToken: TransparentAuthToken = new TransparentAuthToken(transparentAuthTokenAttr)
    expect(transparentAuthToken.generateJitSha256Signature()).to.equal("2cbf757e9824cb7a91af068e0f0c5ffcdb9f316a11ec4e32293ed1593c2d8ba8")
    expect(transparentAuthToken.toCompleteStringWithJitSha256Signature()).to.equal("1.1724770765.2cbf757e9824cb7a91af068e0f0c5ffcdb9f316a11ec4e32293ed1593c2d8ba8")
    const parsedToken: TransparentAuthToken = TransparentAuthToken.parseFromString(transparentAuthToken.toCompleteStringWithJitSha256Signature())
    expect(parsedToken.toCompleteStringWithJitSha256Signature()).to.equal(transparentAuthToken.toCompleteStringWithJitSha256Signature())
  })  
})
