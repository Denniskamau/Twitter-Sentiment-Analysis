var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var port = 3000;
var app = express();

//view Engine
app.set('dist', path.join(__dirname, 'dist'));
app.set('dist engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'dist')));

//Body parser midleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', users);
app.use('/api', search);

app.listen(port, function(){
    console.log('Server running on port' +port);
});
