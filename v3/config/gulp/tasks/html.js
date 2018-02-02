var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

gulp.task('htmlDev', function(){
    return gulp.src(config.path.source.html + '/*.html')
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.path.public.root))
        .pipe(reload({stream: true}));
});

gulp.task('htmlProd', function(){
    return gulp.src(config.path.public.html, {base: config.path.public.root})
        .pipe(plugins.plumber())
        .pipe(plugins.htmlmin({removeComments : true, collapseWhitespace: true}))
        .pipe(gulp.dest(config.path.dist.root));
});

gulp.task('watchHtml', function(){
    gulp.watch(config.path.source.html + '/*.html', ['htmlDev']);
});

