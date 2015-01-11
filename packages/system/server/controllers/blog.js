'use strict';

var request = require('request');
var mean = require('meanio');
var config = mean.loadConfig();
var nodemailer = require('nodemailer');
var config = require('meanio').loadConfig();
var mg = require('nodemailer-mailgun-transport');
var templates = require('../template');

/**
 * List of all posts
 */
exports.all = function(req, res, next) {

  var options = {
    url: 'http://blog.knowrick.com/ghost/api/v0.1/posts',
    headers: {
        'Authorization': config.blog.key
    }
  };

  request(options,function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var posts = JSON.parse(body);
      res.status(200).json(posts);
    }else{
      req.statusCode = response.statusCode;
      next();
    }
  });
};
/**
 * Authenticate to blog
 */
exports.loginToBlog = function(req, res, next){
  if (req.statusCode === 401) {
      request.post
      ({
        url:'http://blog.knowrick.com/ghost/api/v0.1/authentication/token', 
        form: {
          grant_type:'password', 
          username: config.blog.username, 
          password: config.blog.password, 
          client_id: config.blog.clientID 
        }
      },
      function(err,httpResponse,body){
        if (httpResponse.statusCode === 200) {
          var data = JSON.parse(body);
          config.blog.key = 'Bearer ' + data.access_token;
          var options = {
            url: 'http://blog.knowrick.com/ghost/api/v0.1/posts',
            headers: {
                'Authorization': config.blog.key
            }
          };
          request(options, function(err, resHTTP, bod){
            var posts = JSON.parse(bod);
            res.status(200).json(posts);
          });
        }else{
          res.status(500).json({
            error: 'Something went wrong, cant log you in!'
          });
        }
      });
  }else{
    res.status(500).json({
      error: 'Cannot list the posts'
    });
  }
};
/**
 * Send email from contact form
 */
exports.sendEmail = function(req, res, next) {

  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } 
  if (validateEmail(req.body.email)) {
    var auth = {
      auth: {
        api_key: config.mailer.api_key,
        domain: config.mailer.domain
      }
    };
    var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    nodemailerMailgun.sendMail(templates.contactForm(req), function (err, info) {
      if (!err) {
        res.status(200).json({
          message: 'Email was sent, rick will be contacting you shortly.'
        });
      }
      else {
        res.status(500).json({
          error: 'Cannot send the email at this time.'
        });
      }
    });
  }else{
    res.status(500).json({
      error: 'Not a valid email please try again'
    });
  }


};

