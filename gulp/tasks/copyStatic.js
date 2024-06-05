import _config from '../gulp.config.js';
const { config } = _config;

import gulp from 'gulp';
const { src, dest } = gulp;

export const copyStatic = (done) => {
  src(config.staticResources.src).pipe(dest(config.staticResources.dest));

  done();
};
