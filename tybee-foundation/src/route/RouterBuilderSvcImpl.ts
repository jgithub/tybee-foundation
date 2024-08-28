import { Router } from 'express';
import { UserSessionController } from '../user/UserSessionController';
import { RequestInfoController } from '../requestinfo/RequestInfoController';
import { QaSessionController } from '../qa/QaSessionController';
import multer from 'multer';
import { AUDIO_UPLOAD_DIR } from '../constant';

const upload = multer({ dest: AUDIO_UPLOAD_DIR })

export class RouterBuilderSvcImpl {
  constructor(
    private readonly userSessionController: UserSessionController,
    private readonly requestInfoController: RequestInfoController,
    private readonly qaSessionController: QaSessionController) { }

  public build(app: any): Router {
    const router: Router = Router();
    router.get('/user/session/new', this.userSessionController.new.bind(this.userSessionController));
    router.post('/user/session/create', this.userSessionController.create.bind(this.userSessionController));
    router.get('/logout', this.userSessionController.delete.bind(this.userSessionController));
    router.get('/api/v1/ri', (req, res) => this.requestInfoController.ri(req, res));
    router.get('/qa', (req, res) => this.qaSessionController.show(req, res));

    const cpUpload = upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'question_uuid', maxCount: 1 }])
    router.post('/answer/uploadMine', cpUpload, (req, res) => this.qaSessionController.uploadMyAnswer(req, res));

    return router;
  }
}