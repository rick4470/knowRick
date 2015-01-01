'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Page Schema
 */
var PageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  year:{
    type: String,
    default: Date.now,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  overview: {
    type: String,
    required: false,
    trim: true
  },
  video: {
    type: String,
    required: false,
    trim: true
  }
});

/**
 * Statics
 */
PageSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
mongoose.model('Page', PageSchema);