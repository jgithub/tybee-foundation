import { expect } from 'chai';
import { getLogger, d4l, DateProviderService } from '@jgithub/ts-gist-pile';
import container from '../../src/inversify.config'
import DI_TYPES from "../../src/diTypes";

describe('DateProviderService', () => {
  it('has the expected interface', () => {
    const dateProviderService: DateProviderService = {
      getNow: () => {
        return new Date(0)
      }
    }
    expect(dateProviderService.getNow().toISOString()).to.eql("1970-01-01T00:00:00.000Z")
  }) 
  
  it('exists as a singleton service in dependency injection', () => {
    const dateProviderService: DateProviderService = container.get<DateProviderService>(DI_TYPES.DateProviderService);
    expect(dateProviderService.getNow().getTime()).to.be.greaterThan(1724019367551)
  })  
})
