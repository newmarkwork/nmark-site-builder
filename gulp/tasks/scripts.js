import _config from '../gulp.config.js'
const { config } = _config

import gulp from 'gulp'
const { src, dest } = gulp

import rollup from 'gulp-better-rollup'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import rename from 'gulp-rename'
import gulpIf from 'gulp-if'
import uglify from 'gulp-uglify'
import stripDebug from 'gulp-strip-debug'

export const scripts = (done) => {
  src(config.scripts.src, { sourcemaps: config.isProd ? false : true })
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(rename('bundle.js'))
    .pipe(gulpIf(config.isProd, rename({ suffix: '.min' })))
    .pipe(gulpIf(config.isProd, stripDebug()))
    .pipe(gulpIf(config.isProd, uglify()))
    .pipe(dest(config.scripts.dest, { sourcemaps: '.' }))

  done()
}
