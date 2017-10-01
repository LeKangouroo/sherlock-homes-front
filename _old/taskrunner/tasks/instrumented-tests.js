import config from '../config/config';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import paths from '../modules/paths';

gulp.task('instrumented-tests', () => {

  gulp
    .src(paths.relocate(config.common.paths.sources.instrumentedTests))
    .pipe(mocha(config.nodeModules.mocha))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit());
});
