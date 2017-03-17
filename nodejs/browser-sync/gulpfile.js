var gulp = require('gulp');
var browserSync = require('browser-sync').create('server');
var reload = browserSync.reload;

gulp.task('watch', function() {
  var files = ['src/**/*'];
  gulp.watch(files).on('change', reload);
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task('default', ['serve', 'watch']);