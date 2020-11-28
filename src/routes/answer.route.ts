import express from "express";
import passport from "passport";
import { BadRequest } from 'http-errors';

import { AnswerService } from "../core/services";

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.post('/', async (req, res, next) => {
    const {body} = req;
    try {
        const answer = await AnswerService.findByUserId(req.user['_id']);
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
