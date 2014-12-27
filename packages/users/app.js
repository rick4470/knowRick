'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanUser = new Module('users');

MeanUser.register(function(app, auth, passport, database) {
  MeanUser.routes(app, auth, database, passport);
  MeanUser.aggregateAsset('js', 'meanUser.js');
  return MeanUser;
});
