var gulp = require('gulp'),
    config = require('../config.js'),
    plugins = require('gulp-load-plugins')();

gulp.task('images', function() {
    return gulp.src(config.path.public.img + '/{**/*.{jpg,png,gif,svg}, *.{jpg,png,gif,svg}}', { base: config.path.public.img })
        .pipe(plugins.plumber())
        .pipe(plugins.imagemin({
            interlaced: true,
            optimizationLevel: 7,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [plugins.pngquant({
                quality: '65-80',
                speed: 1
            })]
        }))
        .pipe(gulp.dest(config.path.dist.img));
});