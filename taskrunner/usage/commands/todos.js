import mode from '../options/mode';

export default {
  command: 'todos',
  describe: 'Generates ToDo list file based on TODO comments in the source code',
  builder: { mode }
};
