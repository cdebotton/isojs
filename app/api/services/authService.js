var mongoose  = require('mongoose');
var passport  = require('koa-passport');
var Token     = mongoose.model('Token');

var authService = {

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
