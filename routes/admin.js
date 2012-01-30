var ClassNote = mongoose.model('ClassNote');
var Post = mongoose.model('BlogPost');

console.log("Available models...");
console.log(mongoose.models);
console.log("-------------------");

/*************** ADMIN HANDLERS *************************/
app.get('/tehSystem', function(request, response) {
    moment = app.moment;
    var query = ClassNote.find({});
    query.sort('classdate',1);
    
    query.exec({}, function(err,docs){
        for (n in docs) {
            
            docs[n].formattedDate = function() {
                var tmpDate = moment(this.classdate).add('minutes',moment().zone());
                return moment(tmpDate).format("dddd, MMMM Do YYYY");
            };
            //console.log(docs[n]);
        }
        
        response.render("admin/index.html",{
            classNotes : docs,
            layout:'layouts/adminLayout'
        });

    });
    
    
    
});

app.get('/tehSystem/classnotes/entry', function(request, response) {

    response.render("admin/classNotesEntry.html",{
        publishStatus:function(char) {
            return "selected=selected";
        },
        layout:'layouts/adminLayout'
    });
});


app.post('/tehSystem/classnotes/entry', function(request, response) {

    var data = {};

    if (request.body != undefined) {
        var newEntry = new ClassNote();
        newEntry.classdate = new Date(request.body.entry.classdate);
        newEntry.title = request.body.entry.title;
        newEntry.urltitle = request.body.entry.urltitle;
        newEntry.intro = request.body.entry.intro;
        newEntry.notes = request.body.entry.notes;
        newEntry.notesReady = request.body.entry.notesready; 
        newEntry.assignment = request.body.entry.assignment;
        newEntry.publishstatus = request.body.entry.publishstatus;
        
        newEntry.save();
        
    }

    response.redirect("/tehSystem/classnotes/edit/" + newEntry.urltitle);
});

app.get('/tehSystem/classnotes/edit/:urltitle', function(request, response) {
    moment = app.moment;
    console.log("got doc");
    
    //get class notes
    ClassNote.findOne({urltitle:request.params.urltitle},function(err,doc){
        //mustache function for formatting date
        doc.formattedDate = function() {
            tmpDate = moment(this.classdate).add('minutes',moment().zone());
            return moment(tmpDate).format("YYYY-MM-DD");
        };
        
        doc.noteListOptions = [
            {'label':'yes','val':'true','sel' : doc.notesReady == 'true' },
            {'label':'no','val':'false','sel' : doc.notesReady == 'false' }
        ];
        
        doc.publishedstatusOptions = [
            {'label':'Draft','val':'draft','sel' : doc.publishedstatus == 'draft' },
            {'label':'Published','val':'published','sel' : doc.publishedstatus == 'published' }
        ];

        
        response.render("admin/updateEntry.html",{
            classnote : doc,
            layout:'layouts/adminLayout'
        });
    });
});

app.post('/tehSystem/classnotes/edit/:urltitle', function(request, response) {
    
    //get class notes
    var updateData = {
        classdate : new Date(request.body.entry.classdate),
        title : request.body.entry.title,
        urltitle : request.body.entry.urltitle,
        intro : request.body.entry.intro,
        notes : request.body.entry.notes,
        notesReady : request.body.entry.notesready, 
        assignment : request.body.entry.assignment,
        publishedstatus : request.body.entry.publishedstatus
    };
    
    ClassNote.update({urltitle:request.params.urltitle},updateData,function(err,doc){
        if (err) {
            console.log("- - - - - - - - - -");
            console.log(err);
            console.log("- - - - - - - - - -");
        } else {
            response.redirect("/tehSystem/classnotes/edit/" + updateData.urltitle);
        }
    });

});

