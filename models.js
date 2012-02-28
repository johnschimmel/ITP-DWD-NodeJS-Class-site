function buildModels(Schema, mongoose) {
    Comments = new Schema({
      title     : String
    , body      : String
    , date      : Date
    });
    
    mongoose.model('Comment',Comments);
    
    
    var BlogPost = new Schema({
      title     : String
    , body      : String
    , buf       : Buffer
    , date      : Date
    , comments  : [Comments]
    , meta      : {
        votes : Number
        , favs  : Number
      }
    });
    
    mongoose.model('BlogPost',BlogPost);
    
    var assignment = new Schema({
        name : String,
        url : String,
        github : String,
        date : { type: Date, default: Date.now },
    });
    mongoose.model("Assignment", assignment);
    
    var ClassNote = new Schema({
        classdate   : Date,
        urltitle    : { type: String, lowercase: true, unique: true },
        title       : String,
        intro       : String,
        notes       : String,
        notesReady  : String,
        assignment  : String,
        publishedstatus : String,
        lastupdated : { type: Date, default: Date.now },
        assignments : [assignment]
    });
    
    mongoose.model('ClassNote',ClassNote);

    var pageSchema = new Schema({
        title     : String,
        body      : String,
        publishedstatus : String,
        lastupdated : { type: Date, default: Date.now }
    });
    mongoose.model('Page', pageSchema);
    
}

module.exports.buildModels = buildModels;