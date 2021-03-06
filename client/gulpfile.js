var gulp = require('gulp'),
    browserify = require('browserify'),
    sass = require('gulp-sass'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    webserver = require('gulp-webserver');

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('build', function () {
    browserify({
        entries: './js/app.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(''));
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            port: 4001,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('client', ['build', 'sass', 'webserver'], function () {
    gulp.watch('js/**/*.js', ['build']);
    gulp.watch('sass/**/*.scss', ['sass']);
});