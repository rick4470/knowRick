'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Goal Schema
 */
var SubGoalSchema = new Schema({
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
  dateCompleted: {
    type: Date,
    required: false
  },
  completeBy: {
    type: Date,
    required: false
  },
  progress: [{
    type: Schema.ObjectId,
    ref: 'Progress'
  }]
});

/**
 * Statics
 */
SubGoalSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('progress', 'note').exec(cb);
};
mongoose.model('SubGoal', SubGoalSchema);