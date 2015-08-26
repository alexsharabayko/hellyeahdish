var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack'),
    react = require('gulp-react'),
    babel = require('gulp-babel');

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('webpack', function () {
    return gulp.src('js_out/app.js')
        .pipe(webpack({
            output: {
                path: __dirname,
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest('js_out/'));
});

gulp.task('react', function () {
    gulp.src(['js/**/*.jsx'])
        .pipe(react())
        .pipe(gulp.dest('js_out/'));
});

gulp.task('babel', function () {
    gulp.src(['js/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('js_out'));
});

gulp.task('watch', ['sass', 'react', 'babel', 'webpack'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.jsx', ['react', 'babel', 'webpack']);
    gulp.watch('js/**/*.js', ['babel']);
    gulp.watch('js/app.js', ['webpack']);
});