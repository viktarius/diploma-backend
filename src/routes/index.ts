import express from 'express';
import authRouter from './auth.route';
import interviewRouter from './interview.route';
import answerRouter from './answer.route';
import groupRouter from './group.route';
import userRouter from './user.route';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("hello world")
});


router.use('/auth', authRouter);
router.use('/interviews', interviewRouter);
router.use('/answers', answerRouter);
router.use('/groups', groupRouter);
router.use('/users', userRouter);

export default router;
