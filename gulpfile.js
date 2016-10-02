var gulp 	   = require('gulp'),
	sass       = require('gulp-sass'),
	uglifycss  = require('gulp-uglifycss'),
	concatcss  = require('gulp-concat-css'),
	browserify = require('gulp-browserify'),
	rename     = require('gulp-rename'),
	uglify     = require('gulp-uglify'),
	imagemin   = require('gulp-imagemin');


var paths = {
	scss: 'assets/scss/*.scss',
	css: ['assets/css/*.css', '!assets/css/bundle.min.css'],
	script: ['assets/js/app.js', '!assets/js/bundle.min.js'],
	images: ['assets/img/*', '!assets/img/min']
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

gulp.task('image', function(){
	gulp.src(paths.images)
	.pipe(imagemin())
	.pipe(gulp.dest('assets/img/min'));
});


gulp.task('watch', function(){
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.css, ['concat-css']);//qualquer css alterado com exeção do bundle.css
	gulp.watch(paths.script, ['browserify']);
});


gulp.task('default', ['sass', 'concat-css', 'browserify', 'image', 'watch']);