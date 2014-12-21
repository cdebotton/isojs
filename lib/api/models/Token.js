var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');
var timestamps  = require('./plugins/timestampsPlugin');

var SALT_WORK_FACTOR = 10;

var tokenSchema = new Schema({
  _user     : {type: Schema.Types.ObjectId, ref: 'User'},
  key       : {type: String}
});

tokenSchema.plugin(timestamps);

tokenSchema.statics.findOrCreate = function findOrCreate(conditions, doc, options, callback) {
  if (arguments.length < 4) {
    if ('function' === typeof options) {
      callback = options;
      options = {};
    }
    else if ('function' === typeof doc) {
      callback = doc;
      doc = {};
      options = {};
    }
  }

  var self = this;

  this.findOne(conditions)
    .populate('_user', '-password')
    .exec(function(err, result) {
      if (err || result) {
        if (options && options.upsert && !err) {
          self.update(conditions, doc, function(err, count) {
            self.findOne(conditions, function(err, result) {
              callback(err, result, false);
            });
          });
        }
        else {
          callback(err, result, false);
        }
      }
      else {
        for (var key in doc) {
          conditions[key] = doc[key];
        }

        var obj = new self(conditions);
        obj.save(function(err) {
          callback(err, obj, true);
        });
      }
    }
  );
};

tokenSchema.pre('save', function(next) {
  var token = this;

  var key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(key, salt, function(err, hash) {
      if (err) return next(err);
      token.key = hash;
      next();
    });
  });
});

var Token = mongoose.model('Token', tokenSchema);
