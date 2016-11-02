var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
// use static middleware to serve files from public directory.
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

var port = process.env.PORT || 3500;
app.listen(port, function () {
    console.log('App listening on port ' + port + '!');
});