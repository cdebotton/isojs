var mongoose  = require('mongoose');
var Token     = mongoose.model('Token');

var tokensService = {
  all: function *() {
    var users = yield Token.find().exec();

    return users;
  }
};

module.exports = tokensService;
