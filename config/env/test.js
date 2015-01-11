'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-test',
  http: {
    port: 3001
  },
  app: {
    name: 'MEAN - A Modern Stack - Test'
  },
  emailFrom: 'info@knowrick.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
