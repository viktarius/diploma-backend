import express from "express";
import passport from "passport";
import { InternalServerError } from 'http-errors';

import { GroupService } from "../core/services";

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', async (req, res) => {
    const result = await GroupService.getAll();
    res.status(200).send(result);
});

router.post('/', async (req, res, next) => {
    const {body} = req;
    try {
        const result = await GroupService.create(body, req.user['_id']);
        res.status(201).send(result);
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

export default router;
