'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Progress Schema
 */
var ProgressSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    required: false,
    trim: true
  },
  goalTotal: {
    type: Number,
    required: false
  }
});
/**
 * Statics
 */
ProgressSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};
mongoose.model('Progress', ProgressSchema);