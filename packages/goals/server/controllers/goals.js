'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Goal = mongoose.model('Goal'),
   _ = require('lodash');

/**
 * Create a goal
 */
exports.createGoal = function(req, res) {
  var goal = new Goal(req.body);

  goal.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the goal'
      });
    }
    res.json(goal);
  });
};


/**
 * List of goals
 */
exports.all = function(req, res) {

  Goal.find().sort('created').populate('subGoal').exec(function(err, goals){
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the goals'
      });
    }
    res.json(goals);
  });
};

/**
 * Destroy a goal
 */
exports.destroy = function(req, res) { 
  var goal = req.goal;
  goal.remove(function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot delete the goal'
      });
    }
    res.json(goal);
  });
};

/**
 * Update an goal
 */
exports.update = function(req, res) {

  var goal = req.goal;
  goal = _.extend(goal, req.body);

  goal.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the goal'
      });
    }
    res.json(goal);
  });
};

/**
 * Show a goal
 */
exports.show = function(req, res) {
  res.json(req.goal);
};

/**
 * Find goal by id
 */
exports.goal = function(req, res, next, id) {
  Goal.load(id, function(err, goal) {
    if (err) return next(err);
    if (!goal) return next(new Error('Failed to load goal ' + id));
    req.goal = goal;
    next();
  });
};
