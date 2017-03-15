import config from '../config/config';
import gulp from 'gulp';
import jsonServer from 'json-server';
import logger from '../modules/logger';

gulp.task('api', (callback) => {

  const jsonServerConfig = config.nodeModules.jsonServer;
  const server = jsonServer.create();

  server.use(jsonServer.defaults());
  server.use(jsonServer.bodyParser);
  server.use(jsonServer.router(jsonServerConfig.database));
  server.listen(jsonServerConfig.port, () => {

    logger.success(`API REST available at http://localhost:${jsonServerConfig.port}`);
    callback();
  });
});
