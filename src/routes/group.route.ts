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

router.get('/preview', async (req, res, next) => {
    try {
        const result = await GroupService.getGroupPreview();
        res.status(200).send(result);
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GroupService.getById(id);
    res.status(200).send(result);
});

router.post('/:id/invite', async (req, res) => {
    const invited = req.body.invited;
    res.send({invited});
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
