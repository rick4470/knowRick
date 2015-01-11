'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
  debug: true,
//  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: true,
  mongoose: {
    debug: false
  },
  app: {
    name: 'MEAN - FullStack JS - Development'
  },
  emailFrom: '<from email>', // sender address like ABC <abc@example.com>
  mailer: {
    service: '<service>',
    auth: {
      user: '<username>',
      pass: '<password>'
    }
  }
};
