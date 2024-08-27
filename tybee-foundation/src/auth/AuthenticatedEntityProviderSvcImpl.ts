import { RequestContext } from "../request/RequestContext";
import { AuthenticatedEntityProviderSvc } from "./AuthenticatedEntityProviderSvc";

export class AuthenticatedEntityProviderSvcImpl implements AuthenticatedEntityProviderSvc {
  public tryGetAlreadyAuthenticatedEntityId(): number | undefined{
    const authenticatedEntityId = RequestContext.tryGetAuthenticatedEntityId()
    return authenticatedEntityId;
  }
}