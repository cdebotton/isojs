var mongoose  = require('mongoose');
var User      = mongoose.model('User');

var usersService = {
  all: function *() {
    var users = yield User.find()
      .select('-password -__v')
      .exec();

    return users;
  },

  findById: function *(id) {
    var user = User.findById(id)
      .select('-password -__v')
      .exec();

    return user;
  },

  create: function *(body) {
    var params = {
      userName: body.userName,
      password: body.password
    };

    var user = User.create(params);

    return user;
  },

  destroy: function *(id) {
    return User.remove({_id: id}).exec();
  }
};

module.exports = usersService;
