import argv from '../modules/argv';
import config from '../config/config';
import gulp from 'gulp';
import paths from '../modules/paths';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';

const onComplete = (callback) => {

  global.browserSync.reload();
  callback();
};

gulp.task('html', (callback) => {

  gulp
    .src(paths.relocate(config.common.paths.sources.html.default))
      .on('error', (err) => tasks.error('html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
      .on('error', (err) => tasks.error('html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on('error', (err) => tasks.error('html', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on('error', (err) => tasks.error('html', callback, err))
      .on('end', () => tasks.success('html', onComplete.bind(null, callback)));
});
