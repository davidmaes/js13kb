const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('build', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', () => {
    return gulp.watch('./src/**/*.ts', gulp.series('build'));
});

gulp.task('default', gulp.series('build'));


