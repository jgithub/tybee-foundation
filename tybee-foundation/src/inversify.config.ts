import { Container } from "inversify";
import DI_TYPES from "./diTypes";
import { DateProviderService } from '@jgithub/ts-gist-pile';

// Lower order services ^^^^^^^

const dateProviderService: DateProviderService = {
  getNow: () => new Date()
}

// Higher Order Services vvvvvvvvv

const container = new Container();
container.bind<DateProviderService>(DI_TYPES.DateProviderService).toConstantValue(dateProviderService)

export default container;
