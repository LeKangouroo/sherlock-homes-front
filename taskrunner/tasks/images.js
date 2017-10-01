import argv from '../modules/argv';
import config from '../config/config';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminJPEGRecompress from 'imagemin-jpeg-recompress';
import imageminPNGQuant from 'imagemin-pngquant';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

gulp.task('images', (callback) => {

  const src = paths.relocate(config.common.paths.sources.images);
  const dest = paths.relocate(config.common.paths.builds.images[argv.mode]);
  const plugins = [
    imageminPNGQuant(config.nodeModules.imagemin.PNGQuant),
    imageminJPEGRecompress(config.nodeModules.imagemin.JPEGRecompress)
  ];

  gulp
    .src(src)
    .pipe(imagemin(plugins, { verbose: true }))
      .on('error', (err) => tasks.error('images', callback, err))
    .pipe(gulp.dest(dest))
      .on('end', () => tasks.success('images', callback));
});
