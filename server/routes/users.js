var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dennis:dennis@ds127063.mlab.com:27063/twitter-sentiment-analysis',['users']);


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
    db.user.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//save users
router.post('/user', function(req,re,next){
    var user = req.body;
    if(!user.name || !(user.email +'')){
        res.status(400);
        res.json({
            "error":"bad data"
        });
    }else{
        db.users.save(user, function(err,user){
            if (err){
                res.send(err);
            }
            res.json(user);
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
module.exports = router;