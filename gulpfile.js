var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglifycss = require('gulp-uglifycss'),
	concatcss = require('gulp-concat-css');


var paths = {
	scss: 'assets/scss/*.scss',
	css: ['assets/css/*.css', '!assets/css/bundle.css']
}

gulp.task('sass', function(){
	gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('concat-css', function(){
	gulp.src(paths.css)
	.pipe(concatcss('bundle.css'))
	.pipe(uglifycss())
	.pipe(gulp.dest('assets/css'));
});


gulp.task('watch', function(){
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.css, ['concat-css']);//qualquer css alterado com exeção do bundle.css
});


gulp.task('default', ['sass', 'concat-css', 'watch']);