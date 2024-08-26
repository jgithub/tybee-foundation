import { Router } from 'express';
import { UserSessionController } from '../user/UserSessionController';

const router: Router = Router();


const userSessionController = new UserSessionController();
router.get('/user/session/new', userSessionController.new.bind(userSessionController));
router.post('/user/session/create', userSessionController.create.bind(userSessionController));

export default router;