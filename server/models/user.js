var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt  = require('bcryptjs');
var config = require('../config/database');


mongoose.connect(config.database)
Schema = mongoose.Schema;






var UserSchema = new Schema ({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

},{
    collection:'users'
});

const User = module.exports = mongoose.model('User',UserSchema);


///Get user by ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//Get user by username
module.exports.getUserByUsername= function(username, callback){
    const query = {username:username} 
    User.findOne(query , callback);
}

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch); 
    });

}