import express from "express";
import passport from "passport";
import { BadRequest } from 'http-errors';

import { AnswerService } from "../core/services";

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', async (req, res, next) => {
    const interview_id = <string>req.query.interview_id;
    if(interview_id) {
        const answer = await AnswerService.findByUserId(interview_id, req.user['_id']);
        res.status(200).send(answer)
    }
    const answers = await AnswerService.getAll();
    res.status(200).send(answers);
});


router.post('/', async (req, res, next) => {
    const {body} = req;
    try {
        const answer = await AnswerService.findByUserId(body.interview_id, req.user['_id']);
        if (!answer) {
            const result = await AnswerService.create(body, req.user['_id']);
            res.status(201).send(result);
        }
        next(new BadRequest("You have already voted"));
    } catch (e) {
        next(new BadRequest(e.message));
    }
});

export default router;
