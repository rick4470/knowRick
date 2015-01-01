'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Goals = new Module('goals');

Goals.register(function(app, auth, database) {
  Goals.routes(app, auth, database);
  Goals.aggregateAsset('css', 'goals.css');
  return Goals;
});