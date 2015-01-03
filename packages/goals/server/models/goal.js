'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Goal Schema
 */
var GoalSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name:{
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  isComplete: {
    type: Boolean,
    required: false,
    default: false
  },
  dateCompleted: {
    type: Date,
    required: false
  },
  completeBy: {
    type: Date,
    required: false
  },
  goalTotal: {
    type: Number,
    required: false,
    default: 0
  },
  goalTotalCompleted: {
    type: Number, 
    required: false,
    default: 0
  },
  page: {
    type: Schema.ObjectId,
    ref: 'Page'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  subGoal: [{
    type: Schema.ObjectId,
    ref: 'SubGoal'
  }]
});

/**
 * Statics
 */
GoalSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
mongoose.model('Goal', GoalSchema);