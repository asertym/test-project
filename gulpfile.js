// Gulp 4 Configuration

var gulp = require('gulp'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	twig = require('gulp-twig'),
	browser = require('browser-sync').create(),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	sourcemaps = require('gulp-sourcemaps'),
	purgecss = require('gulp-purgecss'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),

	// Directories
	src = {
		scss: 'dev/scss/**/*.scss',
		js: 'dev/js/*.js',
		twig: 'dev/*.html',
		twigs: 'dev/twig/**/*.twig',
		html: 'build/*.html',
		css: 'build/css',
		map: '/maps',
		scripts: 'build/js',
		images: 'build/images/**/*'
	};

gulp.task('images', () => {
	return gulp.src(src.images)
    .pipe(imagemin({
		interlaced: true,
		progressive: true,
		optimizationLevel: 5,
		svgoPlugins: [
			{
				removeViewBox: true
			}
		]
	}))
});

// Makes the OS notification a bit more useful in case of error
var onError = function (err) {
	notify.onError({
		title: "gulp error in " + err.plugin,
		message: err.toString()
	})(err);
	this.emit('end');
};

// Compile Twig to HTML
gulp.task('twig', function () {
	return gulp.src(src.twig) // source
		.pipe(twig())
		.pipe(gulp.dest('build')); // output destination
});

gulp.task('styles', function () {
	return gulp.src(src.scss) // source
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(changed(src.scss))
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(postcss([
			require("tailwindcss")("./tailwind.config.js"),
			require('autoprefixer')
		]))
		.pipe(sourcemaps.write(src.map))
		.pipe(gulp.dest(src.css)) // output
		.pipe(browser.stream())
});

gulp.task('js', function () {
	return gulp.src(src.js)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(changed(src.js))
		.pipe(uglify())
		.pipe(gulp.dest(src.scripts)) // output
		.pipe(browser.stream())
});

// Browsersync
// Server & File Ward
gulp.task('pack', function () {
	browser.init({
		server: {
			baseDir: "build",
		}
	});
	gulp.watch(src.scss, gulp.series('styles'));
	gulp.watch(src.js, gulp.series('js'));
	gulp.watch([src.twig, src.twigs], gulp.series('twig')).on('change', browser.reload);
});

// Purges
gulp.task('purgecss', () => {
    return gulp.src('build/css/*.css')
        .pipe(purgecss({
            content: ['build/*.html']
        }))
		.pipe(gulp.dest('build/css'))
})

gulp.task('purgehtml', () => {
	return gulp.src(src.html)
	  .pipe(htmlmin({ collapseWhitespace: true }))
	  .pipe(gulp.dest('build'))
  });

// launcher
gulp.task('create', gulp.parallel('styles', 'twig', 'js'));
gulp.task('min', gulp.parallel('purgecss', 'purgehtml'));
gulp.task('run', gulp.series('create', 'pack'));