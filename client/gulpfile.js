//var gulp = require('gulp'),
//    sass = require('gulp-sass'),
//    webpack = require('gulp-webpack'),
//    react = require('gulp-react'),
//    babel = require('gulp-babel');
//
//gulp.task('sass', function () {
//    gulp.src('sass/**/*.scss')
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('css'));
//});
//
//gulp.task('webpack', function () {
//    return gulp.src('./js_out/app.js')
//        .pipe(webpack({
//            output: {
//                path: __dirname,
//                filename: 'app.js'
//            }
//        }))
//        .pipe(gulp.dest('js_out/'));
//});
//
//gulp.task('react-babel', function () {
//    gulp.src(['js/**/*.js'])
//        .pipe(babel())
//        .pipe(react())
//        .pipe(gulp.dest('js_out/'));
//});
//
//gulp.task('watch', ['sass', 'react-babel', 'webpack'], function () {
//    gulp.watch('sass/**/*.scss', ['sass']);
//    gulp.watch('js/**/*.js', ['react-babel']);
//    gulp.watch('js/app.js', ['webpack']);
//});

var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('build', function () {
    browserify({
        entries: './js/app.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('js_out'));
});

gulp.task('default', ['build'], function () {
    gulp.watch('js/**/*.js', ['build']);
});