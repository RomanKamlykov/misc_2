const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
  // 1. find scss file
  return gulp.src('./scss/**/*.scss') // соберет все scss-файлы
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browser
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./scss/**/*.scss', style); // обновление без перезагрузки
  gulp.watch('./*.html').on('change', browserSync.reload); // обновление с перезагрузкой
  gulp.watch('./js/**/*.js').on('change', browserSync.reload); // обновление с перезагрузкой
}

exports.style = style;
exports.watch = watch;