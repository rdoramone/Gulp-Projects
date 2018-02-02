var gulp = require('gulp'),
    config = require('../config.js'),
    plugins = require('gulp-load-plugins')();

gulp.task('fonts', function() {
    return gulp.src(config.path.public.fonts + '/*.{eot,svg,ttf,woff}', { base: config.path.public.fonts })
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.path.dist.fonts));
});