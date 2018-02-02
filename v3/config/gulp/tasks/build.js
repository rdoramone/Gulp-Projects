var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync');

gulp.task('browserSyncDev', ['appDev', 'htmlDev', 'libDev', 'sassDev', 'utilDev'], function() {
    browserSync(config.browserSync.dev);
});

gulp.task('browserSyncProd', ['appProd', 'font', 'htmlProd', 'image', 'libProd', 'sassProd', 'utilProd'], function() {
    browserSync(config.browserSync.prod);
});

gulp.task('build-dev', ['browserSyncDev', 'watchApp', 'watchHtml', 'watchLib', 'watchSass', 'watchUtil']);

gulp.task('build-prod', ['browserSyncProd']);