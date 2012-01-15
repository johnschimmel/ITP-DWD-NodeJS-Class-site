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