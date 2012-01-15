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