import api from './commands/api';
import build from './commands/build';
import changelog from './commands/changelog';
import clean from './commands/clean';
import dev from './commands/dev';
import email from './commands/email';
import ftp from './commands/ftp';
import todos from './commands/todos';
import yargs from 'yargs';

const usage = yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(api)
  .command(build)
  .command(changelog)
  .command(clean)
  .command(dev)
  .command(email)
  .command(ftp)
  .command(todos)
  .alias('help', 'h')
  .help();

export default usage;
