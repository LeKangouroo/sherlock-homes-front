import argv from '../modules/argv';
import ftp from 'vinyl-ftp';
import gulp from 'gulp';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

gulp.task('ftp', (callback) => {

  const config = require('../config/tasks/ftp.json')[argv.env];
  const connection = new ftp({
    host: config.host,
    user: config.username,
    pass: config.password,
    log: console.log
  });
  const source = paths.relocate(config.localRoot);
  gulp
    .src(source + '/**', { base: source, buffer: false })
      .on('error', tasks.error.bind(null, 'ftp', callback))
    .pipe(connection.newer(config.remoteRoot))
      .on('error', tasks.error.bind(null, 'ftp', callback))
    .pipe(connection.dest(config.remoteRoot))
      .on('error', tasks.error.bind(null, 'ftp', callback))
      .on('end', tasks.success.bind(null, 'ftp', callback));
});
