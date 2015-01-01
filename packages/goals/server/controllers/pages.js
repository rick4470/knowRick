'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Page = mongoose.model('Page'),
  //moment = require('moment'),
  _ = require('lodash');

/**
 * Finds the latest page
 */
exports.latest = function(req, res, next) {
  var date = new Date();
  var query  = Page.where({ year: date.getFullYear() });
    query.findOne(function (err, page) {
    if (err) return next(err);
    if (!page){
      return res.status(204).json({
        error: 'No content available for that year'
      });
    } 
    if (page) {
      res.json(page);
    }
  });

};

/**
 * Find page by id
 */
exports.page = function(req, res, next, id) {
  Page.load(id, function(err, page) {
    if (err) return next(err);
    if (!page) return next(new Error('Failed to load page ' + id));
    req.page = page;
    next();
  });
};

/**
 * Create a page
 */
exports.create = function(req, res) {
  var page = new Page(req.body);
  page.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the page'
      });
    }
    res.json(page);
  });
};

/**
 * Update an page
 */
exports.update = function(req, res) {
  var page = req.page;

  page = _.extend(page, req.body);

  page.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the page'
      });
    }
    res.json(page);
  });
};

/**
 * Delete a page
 */
exports.destroy = function(req, res) {
  var page = req.page;
  page.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the page'
      });
    }
    res.json(page);
  });
};

/**
 * Show a page
 */
exports.show = function(req, res) {
  res.json(req.page);
};

/**
 * List of pages
 */
exports.all = function(req, res) {
  Page.find().sort('-created').exec(function(err, pages) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the pages'
      });
    }
    res.json(pages);
  });
};