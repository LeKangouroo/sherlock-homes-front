import gulp from 'gulp';
import config from '../config/config';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

gulp.task('static', (callback) => {

  const options = {
    base: paths.relocate(config.common.paths.static.base)
  };
  const source = paths.relocate(config.common.paths.static.source);
  gulp
    .src(source, options)
      .on('error', (err) => tasks.error('static', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.static.destination)))
      .on('error', (err) => tasks.error('static', callback, err))
      .on('end', () => tasks.success('static', callback));
});
