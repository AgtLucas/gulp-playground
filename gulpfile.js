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
  gulp.src('./assets/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Compass
gulp.task('compass', function() {
  gulp.src('./assets/scss/*.scss')
      .pipe(compass({
        config_file: './config.rb'
      }))
      .pipe(gulp.dest('./assets/css'));
});

// Concatenate and Minify JS
gulp.task('scripts', function() {
  gulp.src('./assets/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
});

// Default Task
gulp.task('default', function() {
  gulp.run('lint', 'compass', 'scripts');

  // Watch the files
  gulp.watch(['./assets/js/*.js', './assets/scss/**/*.scss'], function() {
    gulp.run('lint', 'compass', 'scripts');
  });
});