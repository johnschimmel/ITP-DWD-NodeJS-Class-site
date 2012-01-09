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
    
    var template = hogan.compile("@{{name}}");

    var team = ['dhg', 'fat', 'jimio', 'nickgreen', 'sayrer'];

    team.map(function (twitterer) {

      // Render context to template
      return template.render({name: twitterer });

    });

    // outputs "Follow: @dhg @fat @jimio @nickgreen @sayrer!"
    console.log('Follow: ' + team.join(' ') + '!');
    
    
    response.render("index.html",{
        title:"Hello World",
        sidebar: 'Follow: ' + team.join(' ') + '!'
    });

});

/*************** ADMIN HANDLERS *************************/
app.get('/tehSystem', function(request, response) {
    response.render("admin/index.html",{layout:'layouts/adminLayout'});
});

app.get('/tehSystem/classnotes/entry', function(request, response) {

    response.render("admin/classNotesEntry.html",{
        publishStatus:function(char) {
            return "selected=selected";
        },
        layout:'layouts/adminLayout'
    });
});


app.configure('development','production', function(){

    app.use(express.static(__dirname + '/public')); // all static files (css, js, and IMGs) go in here
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    
    // use Hogan.js as template engine. Info http://allampersandall.blogspot.com/2011/12/hoganjs-expressjs-nodejs.html
    app.set('view engine','hogan.js'); 
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.set('view options',{layout:true}); // use layout.html w/ {{{body}}}
    app.register('html',adapter.init(hogan)); //use .html files in /views
    
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
