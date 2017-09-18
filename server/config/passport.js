var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
var mongoose = require('mongoose');
var dbURI = 'mongodb://dennis:dennis@ds127063.mlab.com:27063/twitter-sentiment-analysis';
var config = require('../config/database');

mongoose.connect(config.database)


module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload,done)=>{
        //console.log(jwt_payload);
        User.getUserById(jwt_payload._id,(err,user)=>{
            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user );
            }else{
                return done(null,false);
            }
        });
    }));


}