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
    delete params._id;

    var user = yield User.findByIdAndUpdate(id, params)
      .select('-password -__v')
      .exec();

    return user;
  },

  create: function *(body) {
    var params = {
      email: body.email,
      password: body.password,
      name: {
        first: body.name.first,
        last: body.name.last
      }
    };

    var user = yield User.create(params);

    return user;
  },

  destroy: function *(id) {
    return yield User.findByIdAndRemove(id).exec();
  }
};

module.exports = usersService;
