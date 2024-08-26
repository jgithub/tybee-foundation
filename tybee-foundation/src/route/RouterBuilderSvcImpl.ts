import { Router } from 'express';
import { UserSessionController } from '../user/UserSessionController';

export class RouterBuilderSvcImpl {
  constructor(private readonly userSessionController: UserSessionController) { }

  public build(): Router {
    const router: Router = Router();
    router.get('/user/session/new', this.userSessionController.new.bind(this.userSessionController));
    router.post('/user/session/create', this.userSessionController.create.bind(this.userSessionController));
    return router;
  }
}