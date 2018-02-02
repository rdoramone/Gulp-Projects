var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

gulp.task('sassDev', function() {
    return gulp.src(config.path.source.sass + '/**/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.path.public.css))
        .pipe(reload({ stream: true }));
});

gulp.task('sassProd', function() {
    return gulp.src(config.path.public.css + '/*.css', { base: config.path.public.css })
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.path.dist.css));
});

gulp.task('watchSass', function() {
    gulp.watch(config.path.source.sass + '/**/*.scss', ['sassDev']);
});