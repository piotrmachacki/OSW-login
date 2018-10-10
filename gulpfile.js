var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require("run-sequence");
var imagemin = require('gulp-imagemin');
var gutil = require('gulp-util');

//============================================
// BrowserSync task
//============================================
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

//============================================
// Reload
//============================================
gulp.task('reload', function() {
	browserSync.reload();
});

//============================================
// Clean task
//============================================
gulp.task('clean', function () {
	return gulp.src('./dist', {read: false})
		.pipe(clean());
});

//============================================
// ImageMin task
//============================================
gulp.task('imagemin', function () {
	return gulp.src('./src/images/**')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('./dist/images/'));
});

//============================================
// FileInclude task
//============================================
gulp.task('fileinclude', function() {
	gulp.src(['./src/*.*'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
	.pipe(gulp.dest('./dist/'));
});

//============================================
// Sass task
//============================================
gulp.task('sass', () => {
	return gulp.src('./src/scss/main.scss')
		.pipe(wait(1000))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed' // nested | expanded | compact | compressed
		})).on("error", function (error) {
				gutil.log(
					gutil.colors.red("SASS compile error:"),
					error.message
				);
			})
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(rename('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//============================================
// JS task
//============================================    
gulp.task('js', function() {
	return gulp.src(['./node_modules/particles.js/particles.js', './src/js/scripts.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream({
			match: '**/*.js'
		}))

});

//============================================
// copyFiles task
//============================================    
gulp.task('copyFiles', function() {
	return gulp.src(['./src/**/*.json'])
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream({
			match: '**/*.json'
		}))
});

//============================================
// Watch task
//============================================
gulp.task('watch', function() {
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/**/*.json', ['copyFiles']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch("src/**/*.{html, php}", ['fileinclude']).on('change', browserSync.reload);
	gulp.watch("src/images/**", ['imagemin']).on('change', browserSync.reload);
});


//============================================
// Default task
//============================================
gulp.task('default', runSequence('clean', 'imagemin', 'fileinclude', 'sass', 'js', 'copyFiles', 'browserSync', 'watch'));