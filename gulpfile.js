var gulp = require('gulp'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),
	path = require('path'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

gulp.task('less', function (){

  gulp.src('less/style.less')
  .pipe(less())
  .pipe(gulp.dest('.'))
  .pipe(connect.reload());

});

gulp.task('uglify', function(){
	return gulp.src([
		'js/vendor/angular.js',
		'js/vendor/angular-animate.js',
		'js/vendor/**/*.js',
		'js/modules/**/*.js',
		'js/modules/**/*.js'
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

gulp.task('watch', function(){
	watch('less/**/*.less', function(){
		gulp.start('less');
	});
	watch(['js/modules/**/*.js'], function(){
		gulp.start('uglify');
	});
});

gulp.task('default', ['connect', 'watch']);
