var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync');

gulp.task('browserSyncDev', ['htmlsDev', 'sassDev'], function() {
    browserSync(config.browserSync.dev);
});

gulp.task('browserSyncProd', ['htmlsProd'], function() {
    browserSync(config.browserSync.prod);
});

gulp.task('default', ['browserSyncDev', 'watchHtml', 'watchSass']);

gulp.task('build-prod', ['browserSyncProd']);
