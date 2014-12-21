var mongoose  = require('mongoose');
var passport  = require('koa-passport');
var Token     = mongoose.model('Token');
var invariant = require('react/lib/invariant');

var authService = {
  getCurrentUser: function *(sessionKey, requestKey) {
    try {
      invariant(
        sessionKey === requestKey,
        'sessionKey must equal requestKey'
      );

      var token = yield Token.findOne({key: requestKey})
        .populate('_user', '-password -__v')
        .select('_user')
        .exec();

      return token._user;
    }
    catch (err) {
      return err;
    }
  },

  logout: function *(key) {
    try {
      yield Token.findOneAndRemove({key: key}).exec();
      return true;
    }
    catch (err) {
      return false;
    }
  }
};

module.exports = authService;
