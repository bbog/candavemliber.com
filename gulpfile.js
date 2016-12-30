


var gulp     = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	uglifyJS = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	concat   = require('gulp-concat');


gulp.task('build-css', function() {
	return gulp.src('css/style.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css/'))
});


var js_files = ['js/moment.min.js', 'js/data.js', 'js/main.js'];
gulp.task('build-js', function() {
	return gulp.src(js_files)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('js'))
		.pipe(uglifyJS({ preserveComments: 'license' }))
		.pipe(gulp.dest('js'))
});

gulp.task('build', ['build-css', 'build-js']);

gulp.task('default', ['build']);