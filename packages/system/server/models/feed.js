'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Feed Schema
 */
var FeedSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    goalId: {
        type: Schema.ObjectId,
        ref: 'Goal'
    },
    subGoalId: {
        type: Schema.ObjectId,
        ref: 'SubGoal'
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    youtube: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    }
});

/**
 * Statics
 */
FeedSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};
mongoose.model('Feed', FeedSchema);
