var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path'),
  browserSync = require('browser-sync'),
  through2 = require('through2'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  del = require('del'),
  argv = require('yargs').argv;

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe($.sass.sync().on('error', $.sass.logError))
    .pipe($.sourcemaps.init())
    .pipe($.sass({ outputStyle: 'compressed' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/stylesheets'));
});


gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe(through2.obj(function(file, enc, next) {
      browserify(file.path, { debug: true })
        .transform(require('babelify'))
        .transform(require('debowerify'))
        .bundle(function(err, res) {
          if (err) {
            return next(err); }
          file.contents = res;
          next(null, file);
        });
    }))
    .on('error', function(error) {
      console.log(error.stack);
      this.emit('end')
    })
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('dist/scripts/'));
});


gulp.task('clean', function(cb) {
  del('./dist', cb);
});

gulp.task('templates', function() {
  return gulp.src('src/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest('dist/'))
});

gulp.task('data', function() {
  return gulp.src('src/data/*.json')
    .pipe(gulp.dest('dist/data'));
});

gulp.task('sw', function() {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist/'));
});


gulp.task('build', ['compass', 'js', 'templates', 'data', 'sw']);

gulp.task('serve', ['build', 'browser-sync'], function() {
  gulp.watch('src/stylesheets/**/*.{scss,sass}', ['compass', reload]);
  gulp.watch('src/scripts/**/*.js', ['js', reload]);
  gulp.watch('src/*.html', ['templates', reload]);
});

gulp.task('default', ['serve']);
