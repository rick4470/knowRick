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
  app.route('/sub-goal/:subGoalId').get(auth.isMongoId, subGoals.show);
  app.route('/sub-goal/:subGoalId').delete(auth.requiresLogin, subGoals.destroy);
  app.route('/sub-goal/:subGoalId').put(auth.requiresLogin, subGoals.update);

  // Finish with setting up the subGoalId param
  app.param('subGoalId', subGoals.goal);

};