import argv from '../modules/argv';
import autoPrefixer from 'autoprefixer';
import config from '../config/config';
import gulp from 'gulp';
import paths from '../modules/paths';
import postCSS from 'gulp-postcss';
import sass from 'gulp-sass';
import tasks from '../modules/tasks.js';

gulp.task('sass', (callback) => {

  gulp
    .src(paths.relocate(config.common.paths.sources.sass.default))
      .on('error', (err) => tasks.error('sass', callback, err))
    .pipe(sass(config.nodeModules.sass[argv.mode]))
      .on('error', (err) => tasks.error('sass', callback, err))
    .pipe(postCSS([ autoPrefixer(config.nodeModules.autoPrefixer) ]))
      .on('error', (err) => tasks.error('sass', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.css[argv.mode])))
      .on('end', () => tasks.success('sass', callback))
    .pipe(global.browserSync.stream());
});
