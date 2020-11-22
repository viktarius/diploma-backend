import express from 'express';
import { BadRequest } from 'http-errors';

import { InterviewService } from "../core/services";
import { getById } from "../core/services/interview.service";
import passport from "passport";

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
    const result = await InterviewService.getAll();
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const {body} = req;
    try {
        const result = await InterviewService.create(body, req.user['_id']);
        res.status(201).send(result);
    } catch (e) {
        next(new BadRequest(e.message));
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getById(id);
    res.send(result);
});

export default router;
