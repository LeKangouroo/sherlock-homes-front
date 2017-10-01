import argv from '../modules/argv';
import logger from '../modules/logger';
import git from '../modules/git';
import gulp from 'gulp';
import tasks from '../modules/tasks';

gulp.task('changelog', (callback) => {

  git.changelog({ start: argv.start, end: argv.end, format: argv.format }).then(
    (outputString) => logger.raw(outputString),
    (err) => tasks.error('changelog', callback, err)
  );
});
