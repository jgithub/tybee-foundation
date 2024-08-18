import { expect } from 'chai';
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';


describe('DateProviderService', () => {
  it('has the expected interface', () => {
    const dateProviderService: DateProviderService = {
      getNow: () => {
        return new Date(0)
      }
    }
    expect(dateProviderService.getNow().toISOString()).to.eql("1970-01-01T00:00:00.000Z")
  })  
})
