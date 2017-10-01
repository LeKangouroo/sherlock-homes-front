import env from '../options/env';
import mode from '../options/mode';

export default {
  command: 'dev',
  describe: 'Starts development mode',
  builder: { env, mode }
};
