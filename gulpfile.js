const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('default', ['build']);

gulp.task('watch', () => {
    return gulp.watch('./src/**/*.ts', ['build']);
});

gulp.task('build', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

