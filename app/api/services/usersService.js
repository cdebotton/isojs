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
    var user = yield User.findById(id)
      .select('-password -__v')
      .exec();

    return user;
  },

  findByIdAndUpdate: function *(id, params) {
    var user = yield User.findByIdAndUpdate(id, params)
      .select('-password -__v')
      .exec();

    return user;
  },

  create: function *(body) {
    var params = {
      userName: body.userName,
      password: body.password
    };

    var user = yield User.create(params);

    return user;
  },

  destroy: function *(id) {
    return yield User.remove({_id: id}).exec();
  }
};

module.exports = usersService;
