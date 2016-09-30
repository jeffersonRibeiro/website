var gulp 	   = require('gulp'),
	sass       = require('gulp-sass'),
	uglifycss  = require('gulp-uglifycss'),
	concatcss  = require('gulp-concat-css'),
	browserify = require('gulp-browserify'),
	rename     = require('gulp-rename'),
	uglify     = require('gulp-uglify'),
	pump       = require('pump');


var paths = {
	scss: 'assets/scss/*.scss',
	css: ['assets/css/*.css', '!assets/css/bundle.min.css'],
	script: ['assets/js/app.js', '!assets/js/bundle.min.js']
}

gulp.task('sass', function(){
	gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('concat-css', function(){
	gulp.src(paths.css)
	.pipe(concatcss('bundle.min.css'))
	.pipe(uglifycss())
	.pipe(gulp.dest('assets/css'));
});

gulp.task('browserify', function(){
	gulp.src(paths.script)
	.pipe(browserify({
		insertGlobals : true,
        debug : !gulp.env.production
	}))
	.pipe(rename('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
});


gulp.task('watch', function(){
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.css, ['concat-css']);//qualquer css alterado com exeção do bundle.css
	gulp.watch(paths.script, ['browserify']);
});


gulp.task('default', ['sass', 'concat-css', 'browserify', 'watch']);