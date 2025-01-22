import authRouter from '../modules/auth/auth.routes';
import express from 'express';

const router = express.Router();

router.use('/', authRouter);

export default router;
