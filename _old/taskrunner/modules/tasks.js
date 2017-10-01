import logger from './logger';
import notifications from './notifications';

export const error = (taskName, callback, err) => {

  const message = err.message;
  const title = `"${taskName}" task failed`;

  logger.error(`${title}: ${message}`);
  notifications.notify({title: title, message: message, icon: taskName});
  // NOTE: uncomment the line below to debug the error
  // logger.trace(err);
  return process.exit(1);
};

export const success = (taskName, callback) => {

  logger.success(`"${taskName}" task completed successfully!`);
  callback();
};

export default {
  error,
  success
};