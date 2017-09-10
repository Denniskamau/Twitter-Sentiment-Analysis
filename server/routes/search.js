var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dennis:dennis@ds127063.mlab.com:27063/twitter-sentiment-analysis',['users']);
var PythonShell = require('python-shell');





//save search
router.post('/search', function(req,res,next){
    var search = req.body.search;
    //console.log(search)
    var options = {
        scriptPath: '/home/dennis/Desktop/programs/angular/Twitter-Sentiment-Analysis/'
    };

    var pyshell = new PythonShell('index.py',options);
    pyshell.send(search);
    pyshell.on('message', function (message) {
        console.log(message);
    });



    // var process =  require("child_process")
    //     .spawn(
    //         'python',
    //         ["/home/dennis/Desktop/programs/angular/Twitter-Sentiment-Analysis/index.py", search]);
    // process.stdout.on('data', function (data){
    //     console.log(data);
    // });

    
});



module.exports = router;