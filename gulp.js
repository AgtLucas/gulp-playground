'use strict';

// Include gulp
var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Tasks
// Lint
gulp.task('lint', function() {
  gulp.src('./js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Compass
