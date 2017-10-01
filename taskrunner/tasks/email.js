import argv from '../modules/argv';
import fs from 'fs';
import gulp from 'gulp';
import nodemailer from 'nodemailer';
import paths from '../modules/paths';
import tasks from '../modules/tasks';
import template from 'lodash/template';

gulp.task('email', (callback) => {

  // NOTE: this path should not go in config/config.js. This will cause an error if the file is missing.
  const config = require(paths.relocate('taskrunner/config/tasks/email.json'));

  const transportData = [
    config.server.protocol,
    '://',
    config.credentials.username,
    ':',
    config.credentials.password,
    '@',
    config.server.address
  ];
  const transporter = nodemailer.createTransport(transportData.join(''));
  const tpl = template(fs.readFileSync(paths.relocate(config.message.template)));
  const mailOptions = {
    from: config.message.sender,
    to: config.message.recipients.join(','),
    subject: config.message.subject[argv.env],
    html: tpl(config.message.data[argv.env])
  };

  transporter.sendMail(mailOptions, (error) => {

    if (error)
    {
      tasks.error('email', callback, error);
    }
    else
    {
      tasks.success('email', callback);
    }
  });
});
