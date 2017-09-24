var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var mongojs = require('mongojs');
var jwt = require ('jsonwebtoken');
var passport = require('passport');
const User = require('../models/user');
var config = require('../config/database');


db=mongoose.connect(config.database)




//Register
router.post('/users/register',function(req,res,next) {
    
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,user) => {
        if(err){
            res.json({success:false,msg:'Failed to register user'});
        }else{
            res.json({success:true,msg:'User registerd'});
        }
    }); 
});

//Profile
router.get('/users/profile',passport.authenticate('jwt',{session:false}), function(req,res,next) {
    res.json({user:req.user});
});

//Authenticate
router.post('/users/authenticate',function(req,res,next){
    
    var username = req.body.username;
    var password = req.body.password;

    //Get user by username
    User.getUserByUsername(username, (err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg:'User not found'});
        }
        User.comparePassword(password,user.password,(err, isMatch)=>{
            if (err) throw err;
            if (isMatch){
                var token = jwt.sign({data:user},config.secret,{
                    expiresIn:604800 // a week
                });
                res.json({
                    success:true,
                    token:'JWT ' +token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user,username,
                        email:user.email
                    }
                })
            }else{
                return res.json({success:false, msg:'Wrong password'});
            }

        }); 
    });
});



/*

//Get all users
router.get('/users', function(req,res,next){
  db.users.find(function(err,users){
      if(err){
          res.send(err);
      }
      res.json(users);
  });
});
//get single user
router.get('/user/:id', function(req, res, next){
    db.user.findOne({_id: mongoose.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//save users
router.post('/user', function(req,res,next,err){
    console.log("reached")
    var user = req.body;
    if(!user.username || !(user.email +'') ){
        res.status(400);
        res.json({
            "error":"bad data"
        });
       // res.json({success:false,msg:'Failed to register user'});
    }else{
        db.users.save(user, function(err,user){
            if (err){
                res.send(err);
            }       
            res.json(user);
           // res.json({success:true,msg:'User Registerd'})
        });
    }
   
 
});

//delete users
router.delete('/user/:id', function(req, res, next){
    db.user.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});




//update user
router.put('/user/:id', function(req, res, next){
    var user = req.body;
    var upduser={};

    if(user.username){
        upduser.username= user.username;
    }

    if(user.email){
        upduser.email= user.email;
    }

    if(user.password){
        upduser.password= user.password;
    }
    if(!upduser){
        res.status(400);
        res.json({
            "error":"bad data"
        });
    }else{
        db.user.update({_id: mongojs.ObjectId(req.params.id)},upduser,{}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
    }
    

});
*/
module.exports = router;