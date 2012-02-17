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
    app.db = mongoose.connect(process.env.MONGOLAB_URI); //local dev uses .env file
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
            docs[n].hasAssignment = (docs[n].assignment == "") ? false : true;
            docs[n].hasNotes = ( docs[n].notesReady == "true");
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

app.get('/notes/:urltitle', function(request, response) {

    //get class notes
    ClassNote.findOne({urltitle:request.params.urltitle},function(err,doc){
        console.log("got doc");
        
        //mustache function for formatting date
        doc.hasAssignment = (doc.assignment == "") ? false : true;
        doc.hasNotes = ( doc.notesReady == "true");
        
        doc.formattedDate = function() {
            var tmpDate = moment(this.classdate).add('minutes',moment().zone());
            return moment(tmpDate).format("MMM Do");
        };

        response.render("notes.html",{
            title : "DWD: " + doc.title,
            note : doc, //the requested doc
            layout:'layouts/notesLayout'
        });
        
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
