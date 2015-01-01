'use strict';
var pages = require('../controllers/pages');

// Page authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.page.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Pages, app, auth) {

  app.route('/latest-page')
    .get(function (req, res, next) {
      pages.latest(req, res);
    });
  app.route('/pages')
    .get(pages.all)
    .post(auth.requiresLogin, pages.create);
  app.route('/pages/:pageId')
    .get(auth.isMongoId, pages.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, pages.update)
    .delete(auth.requiresLogin, pages.destroy);



  // Finish with setting up the pageId param
  app.param('pageId', pages.page);
};
