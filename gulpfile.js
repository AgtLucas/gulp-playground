'use strict';

/**
 * Load plugins
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

/**
 * Styles task
 */
gulp.task('styles', function() {
  return gulp.src('assets/scss/style.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffx: '.min'}))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(notify({ message: 'Mission Accomplished!' }));
});

