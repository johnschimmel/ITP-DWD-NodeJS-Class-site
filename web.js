var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var hogan=require('hogan.js'),
	adapter=require('./hogan-express.js');

require('./models.js').buildModels(Schema, mongoose);
var Post = mongoose.model('BlogPost');

var app = express.createServer(express.logger());
var db = mongoose.connect('mongodb://heroku_app2392187:tcmrbi5pr5a3pqdp7193jo1035@dbh70.mongolab.com:27707/heroku_app2392187');


app.get('/', function(request, response) {
    
    //var newPost = new Post();
    //newPost.title = "testing abc abc";
    //newPost.comments.push({title:'TEST comment'});
    //newPost.save();

    var query = Post.find({});
    query.exec(function (err, docs) {
      // called when the `query.complete` or `query.error` are called
      // internally

      for (n in docs) {
          //console.log(docs[n].title);
      }
    });
    
    
    response.render("index.html",{
        title:"Hello World"
    });

});

app.configure('development','production', function(){

    app.use(express.static(__dirname + '/public')); // all static files (css, js, and IMGs) go in here
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.set('view engine','hogan.js'); // use Hogan.js as template engine
    app.set('view options',{layout:true}); // use layout.html w/ {{{body}}}
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.register('html',adapter.init(hogan)); //use .html files in /views
    
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
