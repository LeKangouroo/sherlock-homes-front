import env from '../options/env';

export default {
  command: 'email',
  describe: 'Sends release email',
  builder: {
    'changelog-start': {
      demand: true,
      describe: 'Git commit used as the starting point of the changelog',
      type: 'string'
    },
    'changelog-end': {
      default: 'HEAD',
      describe: 'Git commit used as the ending point of the changelog',
      type: 'string'
    },
    env
  }
};
