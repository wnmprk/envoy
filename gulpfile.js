var bourbon = require('bourbon');
var neat = require('node-neat');
var gulp  = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

// Compiles SCSS
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass({
      includePaths: [
        neat.includePaths,
        bourbon.includePaths
      ],
    }))
    .on('error', handleError)
    .pipe(gulp.dest('app/css/'));
});

// Watches changes in SCSS
gulp.task('watch', function() {
  gulp.watch('app/scss/*.scss', ['sass']);
});

// Serves index.html
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      port: 8080,
      livereload: true,
      open: true,
    }));
});

// Default task
gulp.task('default', ['sass', 'watch', 'webserver']);

function handleError (error) {
  console.log(error.toString())
  this.emit('end')
};
