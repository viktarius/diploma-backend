import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { PASSPORT_EXPIRES_IN, PASSPORT_SECRET_KEY } from './configuration';
import User from '../core/schemas/user.schema';

export const applyPassportStrategy = passport => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PASSPORT_SECRET_KEY,
        jsonWebTokenOptions: {
            maxAge: PASSPORT_EXPIRES_IN
        }
    };

    passport.use(
        new JWTStrategy(options, (payload, done) => {
            User.findOne({email: payload.email}, (err, user) => {
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
