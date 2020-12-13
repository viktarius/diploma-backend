import express from "express";
import passport from "passport";
import { BadRequest, InternalServerError } from 'http-errors';

import { AnswerService } from "../core/services";

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/:interview_id', async (req, res, next) => {
    try {
        const interview_id = <string>req.params.interview_id;
        const admin_id = req.user['_id'];
        if (interview_id) {
            const answer = await AnswerService.getAnswerStatistic(interview_id);
            res.status(200).send(answer)
        } else {
            next(new BadRequest("Interview id isn't provided"));
        }
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

router.post('/', async (req, res, next) => {
    const {body} = req;
    try {
        const answer = await AnswerService.findOne(body.interview_id, req.user['_id']);
        if (!answer) {
            const result = await AnswerService.create(body, req.user['_id']);
            res.status(201).send(result);
        }
        next(new BadRequest("You have already voted"));
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

export default router;
