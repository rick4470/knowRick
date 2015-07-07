'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Goals = new Module('goals');

Goals.register(function (app, auth, database) {
    Goals.routes(app, auth, database);
    Goals.aggregateAsset('css', 'goals.css');

    // Lib Aggrgated Files Javascript
    var libDir = '../lib/';
    Goals.aggregateAsset('js', libDir + 'angular-touch/angular-touch.js');
    Goals.aggregateAsset('js', libDir + 'venturocket-angular-slider/build/angular-slider.min.js');
    Goals.aggregateAsset('js', libDir + 'angular-timer/dist/angular-timer.js');

    // Make sure that angular package knows about any injections.
    Goals.angularDependencies([
        'vr.directives.slider',
        'timer'
    ]);

    return Goals;
});
