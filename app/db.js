//db interaction
'use strict';

var Sequelize = require('sequelize');
var orm = new Sequelize(process.env.DATABASE_URL || 'sqlite://ece490.sqlite');
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var compare = promise.promisify(bcrypt.compare);

/** SCHEMA **/

var User = orm.define('users', {
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: true },
  profilePic: { type: Sequelize.STRING, defaultValue: 'https://s3-us-west-2.amazonaws.com/soundhub/defaultImg.jpg' }
});

orm.sync();

/** AUTH FUNCTIONS **/
var login = function(username, password, callback) {
  var response = {};
  response.success = false;
  var hashedPw;
  var userObj;
  User.findAll({
    where: {
      username: username
    }
  }).then(function(obj) {
    userObj = obj;
    hashedPw = obj[0].dataValues.password;
  }).then(function(obj) {
    return compare(password, hashedPw)
      .then(function(data) { //data = bool from compare
        if (data) {
          response.user = userObj;
          response.success = data;
          callback(response);
        }
      })
  })
};
exports.orm = orm; //so testing suite can sync/drop test.sqlite
exports.login = login;
