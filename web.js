var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
          console.log(docs[n].title);
          
      }
    });
    
    response.send('Hello World!!!');

});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
