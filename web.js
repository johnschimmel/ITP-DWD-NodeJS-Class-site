var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var hogan=require('hogan.js'),
	adapter=require('./hogan-express.js');

require('./models.js').buildModels(Schema, mongoose);
var Post = mongoose.model('BlogPost');
var ClassNote = mongoose.model('ClassNote');

var app = express.createServer();
app.configure( function(){
    app.db = mongoose.connect('mongodb://heroku_app2392187:tcmrbi5pr5a3pqdp7193jo1035@dbh70.mongolab.com:27707/heroku_app2392187');
    app.use(express.bodyParser());
    app.use(express.logger());
    
    
    // use Hogan.js as template engine. Info http://allampersandall.blogspot.com/2011/12/hoganjs-expressjs-nodejs.html
    app.set('view engine','hogan.js'); 
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.set('view options',{layout:true}); // use layout.html w/ {{{body}}}
    app.register('html',adapter.init(hogan)); //use .html files in /views

    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    
    app.use(app.router);
});

app.get("/",function(request, response){
    response.render("index.html")
});


/*************** ADMIN HANDLERS *************************/
app.post('/tehSystem/classnotes/entry', function(request, response) {

    var data = {};

    if (request.body != undefined) {
        
        var newEntry = new ClassNote();
        newEntry.title = request.body.entry.title;
        newEntry.urltitle = request.body.entry.urltitle;
        //newEntry.classdate = request.body.entry.classdate;
        newEntry.intro = request.body.entry.intro;
        newEntry.notes = request.body.entry.notes;
        newEntry.assignment = request.body.entry.assignment;
        newEntry.publishstatus = request.body.entry.publishstatus;

        newEntry.save();
        
        for(n in request.body.entry) {
            data[n] = request.body.entry[n];
        }
        console.log(data);
    }
    

    response.send("ok");
});

app.get('/query', function(request, response) {
    
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
});


require("./boot.js")(app);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);

});
