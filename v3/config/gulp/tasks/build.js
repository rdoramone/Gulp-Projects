var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync');

gulp.task('browserSyncDev', ['appsDev', 'htmlsDev', 'libsDev', 'sassDev', 'utilsDev'], function() {
    browserSync(config.browserSync.dev);
});

gulp.task('browserSyncProd', ['appsProd', 'fonts', 'htmlsProd', 'images', 'libsProd', 'sassProd', 'utilsProd'], function() {
    browserSync(config.browserSync.prod);
});

gulp.task('build-dev', ['browserSyncDev', 'watchApps', 'watchHtml', 'watchLibs', 'watchSass', 'watchUtils']);

gulp.task('build-prod', ['browserSyncProd']);