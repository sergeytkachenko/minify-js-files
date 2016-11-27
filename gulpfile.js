let gulp = require('gulp');
let uglify = require('gulp-uglify');
let pump = require('pump');
let clean = require('gulp-clean');

var gutil = require('gulp-util');
let filterBy = require('gulp-filter-by');
let check = require('syntax-error');

let source = 'files';
let dist = 'dist';

gulp.task('clean', () => {
	return gulp.src(dist, {read: false}).pipe(clean());
});

gulp.task('default', ['clean'], cb => {
	pump([
			gulp.src([`${source}/*.js`, `!${source}/*Tests.js`])
				.pipe(filterBy(function(file) {
					let err = check(file.contents, '');
					return !err;
				})),
			uglify().on('error', gutil.log),
			gulp.dest(dist)
		],
		cb
	);
});