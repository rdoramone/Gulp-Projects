var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

gulp.task('sassDev', function(){
    return gulp.src(config.path.source.sass + '/**/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.compass({
            css: config.path.public.css,
            font: config.path.public.fonts,
            image: config.path.public.img,
            sass: config.path.source.sass,
            comments: false,
            logging: true,
            relative: true,
            style: 'compressed' // Opções de estilo: nested, expanded, compact, or compressed.
        }))
        .pipe(gulp.dest(config.path.public.css))
        .pipe(reload({stream: true}));
});

gulp.task('sassProd', function(){
    return gulp.src(config.path.public.css + '/*.css', {base: config.path.public.css})
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.path.dist.css));
});

gulp.task('watchSass', function(){
    gulp.watch(config.path.source.sass + '/**/*.scss', ['sassDev']);
});
