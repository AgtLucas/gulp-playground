'use strict';

/**
 * Load plugins
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
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
gulp.task('styles', function () {
  return gulp.src('assets/scss/style.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Mission Styles Accomplished!' }));
});

/**
 * JS task
 */
gulp.task('scripts', function () {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Mission JS Accomplished!' }));
});

/**
 * Image task
 */
gulp.task('images', function () {
  return gulp.src('assets/img/**/*.{jpg,jpeg,gif,png}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Mission Image Accomplished!' }));
});

/**
 * Clean task
 */
gulp.task('clean', function () {
  return gulp.src(['build/css', 'build/js', 'build/img'], {read: false})
    .pipe(clean());
});

/**
 * Watch task
 */
gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.warn(err)
    };

    gulp.watch('assets/scss/*.scss', ['styles']);

    gulp.watch('assets/js/**/*.js', ['scripts']);

    gulp.watch('assets/img/**/*', ['images']);
  })
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('styles', 'scripts', 'images');
});