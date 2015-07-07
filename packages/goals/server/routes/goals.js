'use strict';
/* jshint -W098 */
var goals = require('../controllers/goals');

// goal authorization helpers
var hasAuthorization = function (req, res, next) {
    if (!req.user.isAdmin && req.goal.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports = function (Goals, app, auth) {

    app.route('/goal').get(goals.all);
    app.route('/goal').post(auth.requiresLogin, goals.createGoal);
    app.route('/goal/:goalId').get(auth.isMongoId, goals.show);
    app.route('/goal/:goalId').delete(auth.requiresLogin, goals.destroy);
    app.route('/goal/:goalId').put(auth.requiresLogin, goals.update);

    // Finish with setting up the goalId param
    app.param('goalId', goals.goal);

};
