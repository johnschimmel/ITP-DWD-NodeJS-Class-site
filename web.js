var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var hogan=require('hogan.js'),
	adapter=require('./hogan-express.js');

var app = express.createServer(express.logger());
var db = mongoose.connect('mongodb://heroku_app2392187:tcmrbi5pr5a3pqdp7193jo1035@dbh70.mongolab.com:27707/heroku_app2392187');

var mainHandlers = require('./routes/main.js');
var adminHandlers = require('./routes/tehsystem.js');


require('./models.js').buildModels(Schema, mongoose);
//var Post = mongoose.model('BlogPost');
var ClassNote = mongoose.model("ClassNote")

app.configure('development','production', function(){
    app.use(express.bodyParser());
    
    app.use(express.static(__dirname + '/public')); // all static files (css, js, and IMGs) go in here
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    
    // use Hogan.js as template engine. Info http://allampersandall.blogspot.com/2011/12/hoganjs-expressjs-nodejs.html
    app.set('view engine','hogan.js'); 
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.set('view options',{layout:true}); // use layout.html w/ {{{body}}}
    app.register('html',adapter.init(hogan)); //use .html files in /views
    
});

app.get("/",mainHandlers.mainIndexGet);

app.get('/tehSystem', adminHandlers.indexGet);
app.get('/tehSystem/classnotes/entry', adminHandlers.classNoteEntryGet);
app.post('/tehSystem/classnotes/entry', adminHandlers.classNoteEntryPost);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
