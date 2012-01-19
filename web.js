var express = require('express')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , hogan=require('hogan.js')
  , moment=require("moment")
  , adapter=require('./hogan-express.js');


var app = express.createServer();
app.configure( function(){
    app.moment = moment;
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
    
});



app.get("/",function(request, response){
    var query = ClassNote.find({});
    query.sort('classdate',1);
    
    query.exec({}, function(err,docs){
        for (n in docs) {
            docs[n].hasNotes = (docs[n].notes == "") ? false : true;
            docs[n].formattedDate = function() {
                var tmpDate = moment(this.classdate).add('minutes',moment().zone());
                return moment(tmpDate).format("MMM Do");
            };
        }
        
        response.render("index.html",{
            classNotes : docs
        });

    });
    
    //response.render("index.html")
});



app.get('/query', function(request, response) {
    
    //var newPost = new Post();
    //newPost.title = "testing abc abc";
    //newPost.comments.push({title:'TEST comment'});
    //newPost.save();

    var query = models.Post.find({});
    query.exec(function (err, docs) {
      // called when the `query.complete` or `query.error` are called
      // internally

      for (n in docs) {
          //console.log(docs[n].title);
      }
    });
});

require('./models').buildModels(Schema, mongoose);
require("./boot")(app, mongoose);

//Models
var ClassNote = mongoose.model('ClassNote');


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);

});
