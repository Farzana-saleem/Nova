import express from 'express';
import * as profileController from './profile.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const profileRouter = express.Router();

profileRouter.post('/', authMiddleware, profileController.createProfileController,);
profileRouter.get('/', authMiddleware, profileController.getProfileController);
profileRouter.put('/', authMiddleware, profileController.updateProfileController);
profileRouter.put('/approve-reject', authMiddleware, profileController.profileStatusController);
profileRouter.get('/view', authMiddleware, profileController.getAllProfileController);
profileRouter.get('/kpi/:status', authMiddleware, profileController.geProfileStatusKpisController);
profileRouter.get('/kpi', authMiddleware, profileController.geProfileKpisController);



export default profileRouter;
