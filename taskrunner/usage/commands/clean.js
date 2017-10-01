export default {
  command: 'clean',
  describe: 'Cleans project temporary files',
  builder: {
    dist: {
      alias: 'd',
      default: false,
      describe: 'Cleans the dist/ directory as well',
      type: 'boolean'
    }
  }
};
