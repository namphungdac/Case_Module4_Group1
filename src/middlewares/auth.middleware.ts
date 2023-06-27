import passport from "passport";
import {Strategy} from "passport-local";
import User from "../models/schemas/user.schema";
import GoogleStrategy from 'passport-google-oauth2';

passport.use(new Strategy(async function verify(username: string, password: string, cb:any){
    const user = await User.findOne({username});
    if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}))

passport.serializeUser(function(user: any, cb) {
    // tslint:disable-next-line:only-arrow-functions
    process.nextTick(function() {
        cb(null, { id: user._id, username: user.username });
    });
});

passport.deserializeUser(function(user: any, cb): any {
    // tslint:disable-next-line:only-arrow-functions
    process.nextTick(function(): any {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: "769020423438-4uq2t62c2p0lfhmd9fs2r82msrnu97dn.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },

    async (request:any, accessToken:any, refreshToken:any, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'google.id': profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new User({
                google: {
                    id: profile.id,
                },
                username: profile.emails[0].value,
                password: null
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(null, false)
        }
    }
));

export default passport;