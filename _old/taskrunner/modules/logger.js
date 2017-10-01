import chalk from 'chalk';
import gulpUtil from 'gulp-util';

export const log = function() { gulpUtil.log.apply(null, arguments) };

export const raw = function() { console.log.apply(null, arguments) };

export const error = (msg) => log(chalk.red(`[ERROR] ${msg}`));

export const info = (msg) => log(chalk.blue(`[INFO] ${msg}`));

export const success = (msg) => log(chalk.green(`[SUCCESS] ${msg}`));

export const trace = (err) => console.trace(err);

export const warning = (msg) => log(chalk.yellow(`[WARNING] ${msg}`));

export default {
  log,
  error,
  info,
  raw,
  success,
  trace,
  warning
};
