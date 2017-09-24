var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dennis:dennis@ds127063.mlab.com:27063/twitter-sentiment-analysis',['users']);
var PythonShell = require('python-shell');


var tweets = [];
var returnObj = {
    name : "Dennis"
};

//save search
router.post('/search', function(req,res,next){
    

    var search = req.body.search;
    //console.log(search)
    var options = {
        mode: 'text',
        scriptPath: '/home/dennis/Desktop/programs/angular/Twitter-Sentiment-Analysis/'
    };

    var pyshell = new PythonShell('stream.py',options);
    pyshell.send(search);
    pyshell.on('message', function (message) {
        
        console.log("Message : "+message);
        tweets.push(message)
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');

        console.log(JSON.stringify(tweets));

        res.send(JSON.stringify(tweets));
        
    });
    
 
    
});


module.exports = router;