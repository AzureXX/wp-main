const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Auth = require("../models/Auth");

const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const auth = await Auth.findOne({userId: jwt_payload.id}, "+password").populate("userId", "", User).lean()
        if (auth) {
          const user = {...auth.userId, email: auth.email, password: auth.password}
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        console.log(error)
      }
    })
  );
};
