var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');
var supervisor = require( "gulp-supervisor" );
var child_process = require('child_process');

gulp.task('start-mongo', function () {
    child_process.exec('cd server/mongodb/bin/; ./mongod;', function () {
        console.log('Hello');
    });
});

gulp.task('debug', function () {
    gulp.src(['server.js'])
        .pipe(nodeDebug({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 4002
        }));
});

gulp.task('supervisor-simple', function() {
    supervisor('server.js', {
        debug: true
    } );
});

gulp.task('default', ['supervisor-simple', 'debug']);
