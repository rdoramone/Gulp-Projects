var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    gulpfile = require('../../../Gulpfile');

gulp.task(gulpfile.tasks.browserSync.dev, gulpfile.tasks.dev, function() {
    browserSync(config.browserSync.dev);
});

gulp.task(gulpfile.tasks.browserSync.prod, gulpfile.tasks.prod, function() {
    browserSync(config.browserSync.prod);
});

gulp.task('build-dev', gulpfile.tasks.watch);

gulp.task('build-prod', [gulpfile.tasks.browserSync.prod]);

console.log('Dev: ', gulpfile.tasks.dev);
console.log('Prod: ', gulpfile.tasks.prod);
console.log('Watch: ', gulpfile.tasks.watch);