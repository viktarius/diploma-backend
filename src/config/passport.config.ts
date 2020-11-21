import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { PASSPORT_SECRET_KEY } from './config';
import User from '../core/schemas/user.schema';

export const applyPassportStrategy = passport => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PASSPORT_SECRET_KEY
    };
    passport.use(
        new JWTStrategy(options, (payload, done) => {
            User.findOne({ email: payload.email }, (err, user) => {
                if (err) return done(err, false);
                if (user) {
                    return done(null, {
                        email: user.email,
                        _id: user._id
                    });
                }
                return done(null, false);
            });
        })
    );
};
