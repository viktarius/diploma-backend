import express from 'express';
import authRouter from './auth.route';
import interviewRouter from './interview.route';
import answerRouter from './answer.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/interviews', interviewRouter);
router.use('/answers', answerRouter);

export default router;
