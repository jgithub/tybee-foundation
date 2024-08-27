import { asyncLocalStorage } from '../request/MyOnlyAsyncLocalStorage';

export class RequestContext {
  public static tryGetAuthenticatedEntityId(): number | undefined {
    const store = asyncLocalStorage.getStore();
    if (store) {
      return (store as any).authenticatedEntityId;
    }
  }
}