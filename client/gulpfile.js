var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack');

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('webpack', function () {
    return gulp.src('js/app.js')
        .pipe(webpack({
            watch: true,
            output: {
                path: __dirname,
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('js/'));
});

//gulp.task('watch', ['sass'], function () {
//    gulp.watch('sass/**/*.scss', ['sass']);
//});