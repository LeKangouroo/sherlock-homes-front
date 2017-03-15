export default {
  command: 'changelog',
  describe: 'Outputs project changelog',
  builder: {
    start: {
      alias: 's',
      demand: true,
      describe: 'Git commit used as the starting point',
      type: 'string'
    },
    end: {
      alias: 'e',
      default: 'HEAD',
      describe: 'Git commit used as the ending point',
      type: 'string'
    },
    format: {
      alias: 'f',
      choices: ['html', 'markdown'],
      default: 'markdown',
      describe: 'The output format',
      type: 'string'
    }
  }
};
