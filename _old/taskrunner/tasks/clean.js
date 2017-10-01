import argv from '../modules/argv';
import config from '../config/config';
import del from 'del';
import errno from 'errno';
import gulp from 'gulp';
import logger from '../modules/logger';
import paths from '../modules/paths';

const onError = (err, callback) => {

  logger.error('"clean" task failed!');
  logger.log(`\t- Path: ${ err.path }`);
  logger.log(`\t- Cause: ${ errno.code[err.code].description }`);
  logger.trace(err);
  callback(err);
};

const onSuccess = (deletedItems, callback) => {

  logger.success('"clean" task completed successfully!');
  if (deletedItems.length > 0)
  {
    logger.info("Deleted items:");
    deletedItems.forEach((filePath) => logger.log(filePath));
  }
  callback();
};

gulp.task('clean', (callback) => {

  let targets = paths.relocate(config.tasks.clean.paths.development);

  const options = {force: true};

  if (argv.dist)
  {
    targets = targets.concat(paths.relocate(config.tasks.clean.paths.distributable));
  }
  del(targets, options)
  .then((deletedItems) => onSuccess(deletedItems, callback))
  .catch((err) => onError(err, callback));
});
