'use strict';

var mean = require('meanio');
var blog = require('../controllers/blog');
var feed = require('../controllers/feed');

module.exports = function (System, app, auth, database) {
    // Home route
    var index = require('../controllers/index');
    app.route('/')
        .get(index.render);


    app.get('/*', function (req, res, next) {
        res.header('workerID', JSON.stringify(mean.options.workerid));
        next(); // http://expressjs.com/guide.html#passing-route control
    });
    app.route('/posts').get(blog.all);
    app.route('/posts').get(blog.loginToBlog);
    app.route('/contact').post(blog.sendEmail);

    app.route('/feed').get(feed.all);
    app.route('/feed').post(auth.requiresLogin, feed.createPost);
    app.route('/feed/:feedId').get(auth.isMongoId, feed.show);
    app.route('/feed/:feedId').delete(auth.requiresLogin, feed.destroy);
    app.route('/feed/:feedId').put(auth.requiresLogin, feed.update);

    // Finish with setting up the goalId param
    app.param('feedId', feed.feed);
};
