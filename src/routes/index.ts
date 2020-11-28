import express from 'express';
import authRouter from './auth.route';
import interviewRouter from './interview.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/interview', interviewRouter);

export default router;
