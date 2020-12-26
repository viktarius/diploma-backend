import express from "express";
import { BadRequest, InternalServerError } from 'http-errors';
import { UserService } from "../core/services";


const router = express.Router();

router.post('/findByEmail', async (req, res, next) => {
    try {
        const email = req.body.email;
        console.log(email);
        const user = await UserService.findByEmail(email);
        if (user) {
            res.status(200).send(user.toJSON());
        } else {
            next(new BadRequest(`User with email: ${email} not found`));
        }
    } catch (e) {
        next(new InternalServerError(e.message));
    }
});

export default router;
