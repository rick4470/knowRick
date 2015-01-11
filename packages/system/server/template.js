'use strict';

module.exports = {
  contactForm: function(req) {
    var email = {
      from: req.body.email,
      to: 'rick@saltyslopes.com', 
      subject: 'KnowRick.com Message',
      text: 'Hi Rick, Looks like ' + req.body.name + ' has a message for you'+' MESSAGE: ' + req.body.message
    };
    return email;
  }
};
