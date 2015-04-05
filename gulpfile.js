var gulp = require('gulp'),
    babel = require('gulp-babel'),
    es6Source = 'src/*.js';

gulp.task('es6', function () {
    return gulp.src(es6Source)
        .pipe(babel({
            modules: 'amd'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(es6Source, ['es6']);
});

gulp.task('default', ['es6']);
