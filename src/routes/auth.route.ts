import express from 'express';
import passport from "passport";
import jwt from 'jsonwebtoken';
import { Forbidden, InternalServerError } from 'http-errors';

import User from '../core/schemas/user.schema';
import { PASSPORT_EXPIRES_IN, PASSPORT_SECRET_KEY } from "../config";
import { UserService } from "../core/services";

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
        const isPasswordMatched = user.password === password;
        if (isPasswordMatched) {
            // Sign token
            const token = jwt.sign({email}, PASSPORT_SECRET_KEY, {
                expiresIn: PASSPORT_EXPIRES_IN,
            });
            const userToReturn = {...user.toJSON(), ...{token}};
            delete userToReturn.hashedPassword;
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
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            await UserService.create({email, password});

            // Sign token
            const newUser = await User.findOne({email});
            const token = jwt.sign({email}, PASSPORT_SECRET_KEY, {
                expiresIn: PASSPORT_EXPIRES_IN,
            });
            const userToReturn = {...newUser.toJSON(), token};

            delete userToReturn.hashedPassword;

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
        const userToReturn = {...user.toJSON(), ...{token}};
        delete userToReturn.hashedPassword;
        res.status(200).json(userToReturn);
    } catch (e) {
        next(new InternalServerError(e.message))
    }

    // const token = req.header('Authorization');
    // const d = jwt.decode(token);
    // const d2 = jwt.verify(token, PASSPORT_SECRET_KEY);
    // console.log(d2);
    // res.json({user: req.user})
});

export default router;
