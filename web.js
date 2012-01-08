var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

require('./models.js').buildModels(Schema, mongoose);
var Post = mongoose.model('BlogPost');

var app = express.createServer(express.logger());
var db = mongoose.connect('mongodb://heroku_app1873269:55kp21eun4fle1ngb0n6l02p2q@ds029217.mongolab.com:29217/heroku_app1873269');


app.get('/', function(request, response) {
    
    var newPost = new Post();
    newPost.title = "testing abc abc";
    newPost.comments.push({title:'TEST comment'});
    newPost.save();

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

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
