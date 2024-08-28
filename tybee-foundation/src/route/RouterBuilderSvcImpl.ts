import { Router } from 'express';
import { UserSessionController } from '../user/UserSessionController';
import { RequestInfoController } from '../requestinfo/RequestInfoController';
import { QaSessionController } from '../qa/QaSessionController';

export class RouterBuilderSvcImpl {
  constructor(
    private readonly userSessionController: UserSessionController,
    private readonly requestInfoController: RequestInfoController,
    private readonly qaSessionController: QaSessionController) { }

  public build(): Router {
    const router: Router = Router();
    router.get('/user/session/new', this.userSessionController.new.bind(this.userSessionController));
    router.post('/user/session/create', this.userSessionController.create.bind(this.userSessionController));
    router.get('/api/v1/ri', (req, res) => this.requestInfoController.ri(req, res));
    router.get('/qa', (req, res) => this.qaSessionController.show(req, res));

    return router;
  }
}