'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Knowrick, app, auth, database) {

  app.get('/knowrick/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/knowrick/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/knowrick/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/knowrick/example/render', function(req, res, next) {
    Knowrick.render('index', {
      package: 'knowrick'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
