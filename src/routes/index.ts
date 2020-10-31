import express from 'express';
import interviewRouter from './interview.route';

const router = express.Router();

router.use('/interview', interviewRouter);

export default router;
