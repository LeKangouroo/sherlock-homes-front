import env from '../options/env';

export default {
  command: 'email',
  describe: 'Sends release email',
  builder: {
    env
  }
};
