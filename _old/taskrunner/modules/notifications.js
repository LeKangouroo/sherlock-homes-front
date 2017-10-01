import assign from 'lodash/assign';
import fs from 'fs';
import logger from './logger';
import notifier from 'node-notifier';
import paths from './paths';

const DEFAULT_OPTIONS = {
  icon: null,
  title: '[NO TITLE]',
  message: '[NO MESSAGE]'
};

export const notify = (options) => {

  const icon = paths.relocate(`taskrunner/assets/images/notifications/${options.icon}.png`);

  try
  {
    fs.accessSync(icon, fs.F_OK);
    options.icon = icon;
  }
  catch (e)
  {
    options.icon = null;
    //logger.error(e);
  }
  notifier.notify(assign({}, DEFAULT_OPTIONS, options), (err) => {

    if (err)
    {
      logger.error(`an error occured during notification: ${err.message}`);
      logger.trace(err);
    }
  });
};

export default {
  notify
};
