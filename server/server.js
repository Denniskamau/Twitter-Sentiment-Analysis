var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var passport = require('passport');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var config = require('./config/database')
var search = require('./routes/search');

var port = process.env.PORT || 8080;
var app = express();
mongoose.connect(config.database )
//view Engine
//app.set('dist', path.join(__dirname, '../dist'));
app.set('dist engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'../dist')));

//Body parser midleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Passport midleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); 


//Set static files
app.use(express.static(path.join(__dirname,'dist')));

app.use('', index);
app.use('api', users);

app.use('api', search);

app.listen(port, function(){
    console.log('Server running on port' +port);
});
