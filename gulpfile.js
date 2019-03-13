var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    atImport = require('postcss-import'),
    mqpacker = require('css-mqpacker'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssnano = require('cssnano'),
    nunjucksRender = require('gulp-nunjucks-render'),
    clearfix = require('postcss-clearfix'),
    data = require('gulp-data'),
    svgSprite = require('gulp-svg-sprite'),
    config = {
      mode: {
        symbol: { // symbol mode to build the SVG
          dest: 'app/assets/icons', // destination foldeer
          sprite: 'icons.svg', //sprite name
          example: false // Build sample page
        }
      },
      svg: {
        xmlDeclaration: false, // strip out the XML attribute
        doctypeDeclaration: false // don't include the !DOCTYPE declaration
      }
    };

var build = ['app/assets'];

gulp.task('icons', function() {
  return gulp.src('app/src/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('.'));
});


gulp.task('css', function () {
  var processors = [
    atImport,
    cssnext,
    mqpacker,
		clearfix,
    cssnano
  ];
  return gulp.src('app/src/css/*.css')
    .pipe(postcss(processors))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('app/assets'));
});

gulp.task('nunjucks', function() {
  return gulp.src('app/pages/*.njk')
    // Adding data to Nunjucks
    .pipe(data(function() {
      return require('./data.json')
    }))
    .pipe(nunjucksRender({
      path: ['app/pages/', 'app/templates/'] // String or Array
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('browser-sync', function() {
     browserSync({
          server: {
                baseDir: "./app"
          }
     });
});

gulp.task('scripts', function() {
    return gulp.src('app/src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/src/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets'))
        .pipe(reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src('app/src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(build+'/img'))
});

gulp.task('watch', function() {
    gulp.watch('app/templates/**/*.+(njk)', ['nunjucks', reload]);
    gulp.watch('app/**/*.+(njk)', ['nunjucks', reload]);
    gulp.watch('app/src/**/*.css', ['css', reload]);
    gulp.watch(['app/src/js/**/*.js','main.js'], ['scripts', reload]);
    gulp.watch('app/src/img/**/*', ['images', reload]);
    gulp.watch('app/src/icons/**/*', ['icons', reload]);
    gulp.watch("*.html", reload);
});

gulp.task('default', ['nunjucks', 'css', 'browser-sync', 'scripts', 'icons', 'watch']);
