import express from "express";
import passport from "passport";
import { BadRequest, InternalServerError } from 'http-errors';

import { GroupService, UserService } from "../core/services";

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', async (req, res) => {
    const result = await GroupService.getAll();
    res.status(200).send(result);
});

router.get('/preview', async (req, res, next) => {
    try {
        const userId = req.user['_id'];
        const result = await GroupService.getGroupPreview(userId);
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

router.post('/:id/invite', async (req, res, next) => {
    const id = <string>req.params.id;
    try {
        const email = req.body.email;
        const user = await UserService.findByEmail(email);
        if (user) {
            try {
                await GroupService.addUserTo(id, user._id, 'invited');
                res.status(200).send({_id: user._id, email: user.email, displayed_name: user.displayed_name});
            } catch (e) {
                next(new InternalServerError(e.message));
            }
        } else {
            next(new BadRequest(`User with email: ${email} not found`));
        }
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

router.post('/:id/removeUserFrom', async (req, res, next) => {
    const id = <string>req.params.id;
    try {
        const {userId, removeFrom} = req.body;
        await GroupService.removeUserFrom(id, userId, removeFrom.toLowerCase());
        res.status(200).send({message: `user ${userId} was removed from ${removeFrom}`})
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

router.post('/:id/addUserTo', async (req, res, next) => {
    const id = <string>req.params.id;
    try {
        const userId = req.user['_id'];
        const {addTo} = req.body;
        await GroupService.addUserTo(id, userId, addTo.toLowerCase());
        res.status(200).send({message: `user ${userId} was added to ${addTo}`});
    } catch (e) {
        next(new InternalServerError(e.message));
    }
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
