var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');
var timestamps  = require('./plugins/timestampsPlugin');

var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastLogin: { type: Date }
});

userSchema.plugin(timestamps);

userSchema.virtual('name.full').get(function() {
  return this.name.first + ' ' + this.name.last;
});

userSchema.pre('save', function(next) {
  var user = this;

  if (! user.createdAt) user.createdAt = new Date();
  user.updatedAt = new Date();

  if (! user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;

      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

mongoose.model('User', userSchema);
