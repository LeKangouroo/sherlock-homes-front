import autoPrefixer from './nodeModules/auto-prefixer.json';
import browserSync from './nodeModules/browser-sync.json';
import clean from './tasks/clean.json';
import JPEGRecompress from './nodeModules/imagemin/jpeg-recompress.json';
import jsonServer from './nodeModules/json-server.json';
import mocha from './nodeModules/mocha';
import paths from './common/paths.json';
import PNGQuant from './nodeModules/imagemin/pngquant.json';
import pug from './nodeModules/pug.json';
import replacements from './common/replacements';
import sass from './nodeModules/sass.json';
import svgSprite from './nodeModules/svg-sprite.json';
import versioning from './common/versioning.json';
import webpack from './nodeModules/webpack';

export default {
  common: {
    paths,
    replacements,
    versioning
  },
  nodeModules: {
    autoPrefixer,
    browserSync,
    imagemin: { PNGQuant, JPEGRecompress },
    jsonServer,
    mocha,
    pug,
    sass,
    svgSprite,
    webpack
  },
  tasks: {
    clean
  }
};
