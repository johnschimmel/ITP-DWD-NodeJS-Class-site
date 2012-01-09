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
    
    
    var ClassNote = new Schema({
        classdate   : Date,
        urltitle    : String,
        title       : String,
        intro       : String,
        notes       : String,
        assignment  : String,
        publishedstatus: String,
        lastupdated : Date
    });
    
    mongoose.model('ClassNote',ClassNote);
    
}

module.exports.buildModels = buildModels;