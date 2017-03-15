import argv from '../modules/argv';
import config from '../config/config';
import gulp from 'gulp';
import paths from '../modules/paths';
import tasks from '../modules/tasks';
import todo from 'gulp-todo';

gulp.task('todos', (callback) => {

  gulp
    .src(paths.relocate(config.common.paths.sources.todos))
      .on('error', (err) => tasks.error('todos', callback, err))
    .pipe(todo({fileName: 'TODO.md'}))
      .on('error', (err) => tasks.error('todos', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.todos[argv.mode])))
      .on('error', (err) => tasks.error('todos', callback, err))
      .on('end', () => tasks.success('todos', callback));
});
