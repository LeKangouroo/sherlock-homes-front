import argv from '../modules/argv';
import config from '../config/config';
import gulp from 'gulp';
import pug from 'gulp-pug';
import paths from '../modules/paths';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';

const onComplete = (callback) => {

  global.browserSync.reload();
  callback();
};

gulp.task('pug', (callback) => {

  const cfg = config.nodeModules.pug;

  cfg.locals = { BUILD_MODE: argv.mode, ENV: argv.env };
  gulp.src(paths.relocate(config.common.paths.sources.pug.default))
      .on('error', (err) => tasks.error('pug', callback, err))
    .pipe(pug(cfg))
      .on('error', (err) => tasks.error('pug', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
      .on('error', (err) => tasks.error('pug', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on('error', (err) => tasks.error('pug', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on('error', (err) => tasks.error('pug', callback, err))
      .on('end', () => tasks.success('pug', onComplete.bind(null, callback)));
});
