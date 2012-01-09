exports.main = {}
exports.mainIndexGet = function(request, response) {
    
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

};