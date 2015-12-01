'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');

var SystemPackage = new Module('system');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
SystemPackage.register(function (app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  SystemPackage.routes(app, auth, database);

  // System Aggrgated Files
  SystemPackage.aggregateAsset('css', 'common.css');

  // Lib Aggrgated Files
  var libDir = '../lib/';
  SystemPackage.aggregateAsset('css', libDir + 'css/style.css');
  SystemPackage.aggregateAsset('css', libDir + 'css/bootstrap-theme.css');
  SystemPackage.aggregateAsset('css', libDir + 'css/font-awesome.css');
  SystemPackage.aggregateAsset('css', libDir + 'css/font-awesome-ie7.css');

  // Javascript
  SystemPackage.aggregateAsset('js', libDir + 'js/bootstrap.js');
  SystemPackage.aggregateAsset('js', libDir + 'js/html5.js');
  SystemPackage.aggregateAsset('js', libDir + 'js/rebound.js');
  SystemPackage.aggregateAsset('js', libDir + 'js/respond.src.js');
  SystemPackage.aggregateAsset('js', libDir + 'js/typeahead.min.js');
  SystemPackage.aggregateAsset('js', libDir + 'js/jquery.isotope.min.js');

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return SystemPackage;
});
