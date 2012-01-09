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
    
    var ClassNotes = new Schema({
        classdate: Date,
        urltitle: String,
        title   : { type: String, required: 'true' },
        intro   : String,
        notes : String,
        assignment : String,
        publishstatus: { type: String, default: 'draft' },
        lastUpdated    : {type:Date, default: Date.now},
    });
    mongoose.model('ClassNote',ClassNotes);
    
}

module.exports.buildModels = buildModels;