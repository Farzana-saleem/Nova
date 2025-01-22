import express from 'express';
import * as profileController from './profile.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const profileRouter = express.Router();

profileRouter.get('/:userId', authMiddleware,profileController. getProfileController);

export default profileRouter;
