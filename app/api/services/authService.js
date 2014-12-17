var mongoose  = require('mongoose');
var passport  = require('koa-passport');
var Token     = mongoose.model('Token');

var authService = {

  logout: function *(key) {
    var removal = yield Token.findOneAndRemove({key: key}).exec();

    return removal;
  },

  validateToken: function *(key) {
    var tokenData = yield Token.findOne({key: req.body.key})
      .populate('_user', '-password -createdAt -updatedAt')
      .exec();

    return {err: tokenData.err }
  }
};

module.exports = authService;
