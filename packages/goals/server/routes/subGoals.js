'use strict';
/* jshint -W098 */
var subGoals = require('../controllers/subGoals');

// goal authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.goal.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(SubGoals, app, auth) {
  
  app.route('/sub-goal').post(auth.requiresLogin, subGoals.createGoal);
  app.route('/sub-goal').get(subGoals.all);
  app.route('/sub-goal/:goalId').delete(auth.requiresLogin, subGoals.destroy);
  app.route('/sub-goal/:goalId').put(auth.requiresLogin, subGoals.update);

  // Finish with setting up the goalId param
  app.param('goalId', subGoals.goal);

};