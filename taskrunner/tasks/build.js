import argv from '../modules/argv';
import git from '../modules/git';
import gulp from 'gulp';
import fs from 'fs';
import logger from '../modules/logger';
import paths from '../modules/paths';
import pkg from '../../package.json';


const saveBuildData = (filePath, data) => {

  return new Promise((resolve, reject) => {

    const DIST_DIRECTORY = paths.relocate('dist');

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {

      if (err)
      {
        logger.error(`❗  Couldn't write the following file: ${filePath}`);
        reject(err);
      }
      logger.success(`👍  Completed successfully! Your build is available in the following directory: ${DIST_DIRECTORY}`);
      resolve();
    });
  });
};


gulp.task('build', ['sass', 'svg', 'html', 'pug', 'javascript', 'static', 'images', 'todos'], (callback) => {

  const BUILD_DATA = {
    date: new Date().toISOString(),
    env: argv.env,
    lastCommit: false,
    name: pkg.name,
    version: pkg.version || null
  };
  const BUILD_DATA_FILE = paths.relocate('dist/build.json');

  git
    .getHeadCommit()
    .then((headCommit) => {

      BUILD_DATA.lastCommit = headCommit;
      saveBuildData(BUILD_DATA_FILE, BUILD_DATA)
        .then(() => callback())
        .catch(() => callback());
    })
    .catch((err) => {

      logger.warning('Git HEAD commit retrieving failed. See details below:');
      logger.trace(err.message);
      saveBuildData(BUILD_DATA_FILE, BUILD_DATA)
        .then(() => callback())
        .catch(() => callback());
    });
});
