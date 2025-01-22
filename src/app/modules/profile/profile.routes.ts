import express from 'express';
import * as profileController from './profile.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const profileRouter = express.Router();

profileRouter.post('/', authMiddleware, profileController.createProfileController,);
profileRouter.get('/', authMiddleware, profileController.getProfileController);
profileRouter.put('/', authMiddleware, profileController.updateProfileController);

export default profileRouter;
