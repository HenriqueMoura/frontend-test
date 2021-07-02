var
  gulp = require('gulp'),
  gulpSass = require('gulp-sass'),
  nodeSass = require('node-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  purgecss = require('gulp-purgecss'),
  browserSync = require('browser-sync').create(),
  sass = gulpSass(nodeSass);

function css() {
  return gulp.src('public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename("style.min.css"))
    .pipe(
      purgecss({
        content: ['public/**/*.html']
      })
    )
    .pipe(gulp.dest('./public/stylesheets/'))
    .pipe(browserSync.stream());
}

exports.default = function () {
  gulp.watch('public/scss/*.scss', css);
};