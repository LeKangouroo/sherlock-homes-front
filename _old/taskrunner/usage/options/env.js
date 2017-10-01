export default {
  alias: 'e',
  choices: ['development', 'pre-production', 'production'],
  default: 'development',
  describe: 'Sets current environment.',
  type: 'string'
};
