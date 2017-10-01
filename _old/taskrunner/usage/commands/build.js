import env from '../options/env';
import mode from '../options/mode';

export default {
  command: 'build',
  describe: 'Builds project distributable source code',
  builder: { env, mode }
};
