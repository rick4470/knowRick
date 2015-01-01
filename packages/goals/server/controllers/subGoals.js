'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  SubGoal = mongoose.model('SubGoal'),
   _ = require('lodash');

/**
 * Create a goal
 */
exports.createGoal = function(req, res) {
  var goal = new SubGoal(req.body);

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
 * List of all sub goals
 */
exports.all = function(req, res) {
  SubGoal.find().sort('-created').exec(function(err, goals) {
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
 * Find goal by id
 */
exports.goal = function(req, res, next, id) {
  SubGoal.load(id, function(err, goal) {
    if (err) return next(err);
    if (!goal) return next(new Error('Failed to load goal ' + id));
    req.goal = goal;
    next();
  });
};