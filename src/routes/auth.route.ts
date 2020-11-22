import express from 'express';
import passport from "passport";
import jwt from 'jsonwebtoken';
import { Forbidden, InternalServerError, Unauthorized } from 'http-errors';

import User from '../core/schemas/user.schema';
import { PASSPORT_EXPIRES_IN, PASSPORT_SECRET_KEY } from "../config";
import { UserService } from "../core/services";
import sha256 from "sha256";

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.find({}, (err, result) => {
        res.status(200).json({data: result});
    });
});

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && user.email) {
        const isPasswordMatched = sha256(user.password) === password;
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
        const user = await User.findOne({email});

        if (!user) {
            await UserService.create(req.body);

            // Sign token
            const newUser = await User.findOne({email});
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
        const user = await User.findOne({email});

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
