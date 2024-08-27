export interface AuthenticatedEntityProviderSvc {
  /**
   * If the user is signed in, this method returns the id of the authenticated entity.
   */

  tryGetAlreadyAuthenticatedEntityId(): number | undefined; 
}