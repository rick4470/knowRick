'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Feed = mongoose.model('Feed'),
    _ = require('lodash');

/**
 * Create a new post for the feed
 */
exports.createPost = function (req, res) {
    var post = new Feed(req.body);

    post.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the post'
            });
        }
        res.json(post);
    });
};


/**
 * List of all posts on feed
 */
exports.all = function (req, res) {

    Feed.find().sort('created').exec(function (err, posts) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the posts for the feed'
            });
        }
        res.json(posts);
    });
};

/**
 * Destroy a post on the feed
 */
exports.destroy = function (req, res) {
    var post = req.post;
    post.remove(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Cannot delete the post on the feed'
            });
        }
        res.json(post);
    });
};

/**
 * Update a post on the feed 
 */
exports.update = function (req, res) {

    var post = req.post;
    post = _.extend(post, req.body);

    post.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the post on the feed'
            });
        }
        res.json(post);
    });
};

/**
 * Show a feed item
 */
exports.show = function (req, res) {
    res.json(req.post);
};

/**
 * Find a post by id
 */
exports.feed = function (req, res, next, id) {
    Feed.load(id, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load post in feed ' + id));
        req.post = post;
        next();
    });
};
