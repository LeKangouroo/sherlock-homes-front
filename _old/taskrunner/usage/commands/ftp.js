import env from '../options/env';

export default {
  command: 'ftp',
  describe: 'Deploys project distributable source code using FTP',
  builder: { env }
};
