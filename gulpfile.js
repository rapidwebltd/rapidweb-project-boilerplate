/*Project Vars*/
var html_dir = ['./*.html', './*.php', './**/*.html', './**/*.php'],
    less_dir = ['./less/style.less'],
    js_dir = ['./bower_components/jquery/dist/jquery.min.js', 
    './bower_components/bootstrap/js/ie10-viewport-bug-workaround.js', 
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './js/scripts.js'],
    js_output_dir = './public/js',
    css_dir = './public/css',
    php_dir = ['./*.php', './**/*.php'];

/*Gulp Requires*/
var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    watch = require('gulp-watch'),
    path = require('path'),
    bootlint  = require('gulp-bootlint'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    cat = require('gulp-concat'),
    cleancss = new LessPluginCleanCSS({ advanced: true, keepSpecialComments: 0 });

/*Watch Task*/
gulp.task('watch', function() {


    gulp.watch(less_dir).on('change', function(file) {
        return gulp.src(file.path)
            .pipe(less({
              paths: [ path.join(__dirname, 'less', 'includes') ],
              plugins: [cleancss]
            }))
            .pipe(gulp.dest(css_dir));
    });

    gulp.watch(html_dir).on('change', function(file) {
        return gulp.src(file.path)
                .pipe(bootlint({disabledIds: ['E001', 'W001', 'W002', 'W003', 'W005']}));
    });

	gulp.watch(js_dir).on('change', function(file) {
        return gulp.src(js_dir)
	        .pipe(jshint())
	        .pipe(jshint.reporter('jshint-stylish'))
	        .pipe(uglify())
	        .pipe(cat('scripts.min.js'))
	        .pipe(gulp.dest(js_output_dir));
	});
});

/*Compile LESS*/
gulp.task('less', function() {
	return gulp.src(less_dir)
            .pipe(less({
              paths: [ path.join(__dirname, 'less', 'includes') ],
              plugins: [cleancss]
            }))
            .pipe(gulp.dest(css_dir));
});
/*Bootlint*/
gulp.task('bootlint', function() {
	return gulp.src(html_dir)
                .pipe(bootlint({disabledIds: ['E001', 'W001', 'W002', 'W003', 'W005']}));
	
});
/*JS Lint*/
gulp.task('jshint', function() {
  return gulp.src(js_dir)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
