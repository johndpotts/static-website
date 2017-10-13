// include gulp
var gulp = require('gulp');
var spawn = require('child_process').spawn;

// include pluginss
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./",
    });
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch(["./*.html", "./js/*.js"]).on('change', browserSync.reload);
});

gulp.task('plumber', ['sass'], function () {
    gulp.src('./src/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});
gulp.task('js', function () {
    return gulp.src("./js/scripts")
        .pipe(gulp.dest("./js/scripts"))
        .pipe(browserSync.stream());
});

gulp.task('default', () =>
    gulp.src('js/scripts.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./js'))
);

// Gulp auto-reload
gulp.task('auto-reload', function () {
    spawn('gulp', [], {
        stdio: 'inherit'
    });
    process.exit();
});
gulp.task('watch', function () {
    gulp.watch('gulpfile.js', ['auto-reload']);
});

gulp.task('default', ['serve', 'watch']);
