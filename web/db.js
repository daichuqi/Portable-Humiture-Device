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
  var response = {success:false};
  if(username==='hello' && password==='123'){
    response.success = true;
  }
  callback(response);
};
exports.orm = orm; //so testing suite can sync/drop test.sqlite
exports.login = login;
