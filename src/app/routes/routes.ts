import authRouter from '../modules/auth/auth.routes';
import profileRouter from '../modules/profile/profile.routes';
import express from 'express';

const router = express.Router();

router.use('/', authRouter);
router.use('/profile', profileRouter);

export default router;
