var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

gulp.task('libDev', function() {
    return gulp.src(config.path.source.js.libs + '/*.js', { base: config.path.source.js.libs })
        .pipe(plugins.plumber())
        .pipe(plugins.concat('libs.js'))
        .pipe(gulp.dest(config.path.public.js.libs))
        .pipe(reload({ stream: true }));
});

gulp.task('libProd', function() {
    return gulp.src(config.path.public.js.libs + '/*.js', { base: config.path.public.js.libs })
        .pipe(plugins.plumber())
        .pipe(plugins.uglify({
            preserveComments: false
        }))
        .pipe(gulp.dest(config.path.dist.js.libs));
});

gulp.task('watchLib', function() {
    gulp.watch(config.path.source.js.libs + '/*.js', ['libDev']);
});