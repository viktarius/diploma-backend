import express from 'express';
import passport from "passport";
import jwt from 'jsonwebtoken';
import { Forbidden, InternalServerError, Unauthorized } from 'http-errors';

import { PASSPORT_EXPIRES_IN, PASSPORT_SECRET_KEY } from "../config";
import { UserService } from "../core/services";
import sha256 from "sha256";

const router = express.Router();

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await UserService.findByEmail(email);
    if (user && user.email) {
        const isPasswordMatched = user.password === sha256(password);
        if (isPasswordMatched) {
            // Sign token
            const token = jwt.sign({email}, PASSPORT_SECRET_KEY, {
                expiresIn: PASSPORT_EXPIRES_IN,
            });

            const userToReturn = {userInfo: user.toJSON(), token};
            res.status(200).json(userToReturn);
        } else {
            next(new Forbidden('login password error'));
        }
    } else {
        next(new Forbidden('login email error'));
    }

});

router.post('/register', async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await UserService.findByEmail(email);

        if (!user) {
            await UserService.create(req.body);

            // Sign token
            const newUser = await UserService.findByEmail(email);
            const token = jwt.sign({email}, PASSPORT_SECRET_KEY, {
                expiresIn: PASSPORT_EXPIRES_IN,
            });
            const userToReturn = {userInfo: newUser.toJSON(), token};
            res.status(200).json(userToReturn);
        } else {
            next(new Forbidden(`register email error`))
        }
    } catch (e) {
        next(new InternalServerError(e.message))
    }
});

router.get('/refreshToken', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const email = req.user['email'];
        const user = await UserService.findByEmail(email);

        const token = jwt.sign({email}, PASSPORT_SECRET_KEY, {
            expiresIn: PASSPORT_EXPIRES_IN,
        });
        const userToReturn = {userInfo: user.toJSON(), token};
        res.status(200).json(userToReturn);
    } catch (e) {
        next(new InternalServerError(e.message))
    }
});

router.get('/checkToken', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = req.header('Authorization').substring(7);
    if (jwt.verify(token, PASSPORT_SECRET_KEY)) {
        res.send({message: 'ok'})
    }
    next(new Unauthorized('invalid token'))
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    req.logout();
    res.send({message: 'ok'})
});

export default router;
