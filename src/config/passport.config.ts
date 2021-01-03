import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { UserCollection } from '../core/schemas';
import { PASSPORT_SECRET_KEY } from './configuration';
import { PASSPORT_EXPIRES_IN } from "./constants";

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
            UserCollection.findOne({email: payload.email}, (err, user) => {
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
