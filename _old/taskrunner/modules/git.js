import _ from 'lodash';
import { exec } from 'child_process';
import config from '../config/config';
import fs from 'fs';
import path from 'path';
import pkg from '../../package.json';

const CHANGELOG_DEFAULT_OPTIONS = {
  format: 'markdown',
  start: null,
  end: 'HEAD'
};

const formatChangelog = (commits, format) => {

  const data = {
    commits,
    datetime: new Date().toUTCString(),
    version: pkg.version
  };
  const templates = {
    html: fs.readFileSync(path.resolve(__dirname, '../templates/changelog/html.txt'), { encoding: 'utf8' }),
    markdown: fs.readFileSync(path.resolve(__dirname, '../templates/changelog/markdown.txt'), { encoding: 'utf8' })
  };
  return _.template(templates[format] || templates.markdown)(data);
};

export const changelog = (options) => {

  return new Promise((resolve, reject) => {

    if (!options.start)
    {
      return reject(new Error('missing start commit ID (use npm run chlg -- --start=<commit-id>)'));
    }

    const opts = _.assign({}, CHANGELOG_DEFAULT_OPTIONS, options);
    const cmd = `git log --pretty="format:%s (commit #%h)" --no-merges --reverse ${opts.start}..${opts.end}`;

    exec(cmd, (err, stdout) => {

      if (err)
      {
        return reject(err);
      }

      const rawCommits = stdout.split('\n');
      const commits = {
        features: [],
        hotfixes: [],
        miscellaneous: []
      };
      const hotfixesKeywords = config.common.versioning.changelog.hotfixesKeywords;
      const featuresKeywords = config.common.versioning.changelog.featuresKeywords;

      rawCommits.forEach((commit) => {

        if (new RegExp(`\\b(${ hotfixesKeywords.join('|') })\\b`).test(commit) === true)
        {
          commits.hotfixes.push(commit);
        }
        else if (new RegExp(`\\b(${ featuresKeywords.join('|') })\\b`).test(commit) === true)
        {
          commits.features.push(commit);
        }
        else
        {
          commits.miscellaneous.push(commit);
        }
      });
      resolve(formatChangelog(commits, opts.format));
    });
  });
};

export const getHeadCommit = () => {

  return new Promise((resolve, reject) => {

    exec('git rev-parse --verify HEAD --short', (err, stdout) => {

      if (err)
      {
        return reject(err);
      }
      resolve(stdout.replace(/\n/g, ''));
    });
  });
};

export default {
  changelog,
  getHeadCommit
};
