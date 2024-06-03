import _config from '../gulp.config.js'
const { config } = _config

import gulp from 'gulp'
const { src, dest } = gulp

import merge from 'merge-stream'

export const copyStatic = (done) => {
  merge(
    src([config.fonts.src]).pipe(dest(config.fonts.dest)),
    src([config.staticResources.src]).pipe(dest(config.staticResources.dest))
  )

  done()
}
