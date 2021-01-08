// Gulp.js configuration
'use strict';

const
    // source and build folders
    dir = {
        src: 'src/',
        build: '/Users/rossanabermudez/Local Sites/politest/app/public/wp-content/themes/Reykjavik Child'
    },

    // Gulp and plugins
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss');

// Browser-sync
const browsersync = false;

// PHP settings
const php = {
    src: dir.src + '**/**/*.php',
    build: dir.build
};

// copy PHP files
gulp.task('templates', () => {
    return gulp.src(php.src)
        .pipe(newer(php.build))
        .pipe(gulp.dest(php.build));
})

// copy screenshot
gulp.task('screenshot', () => {
    return gulp.src(dir.src + "screenshot.jpg")
        .pipe(gulp.dest(dir.build));
})
// copy screenshot
gulp.task('functions', () => {
    return gulp.src(dir.src + "functions.php")
        .pipe(gulp.dest(dir.build));
})

// copy all important files
gulp.task('copy-base', gulp.series('functions', 'screenshot', 'templates'))

// image settings
const images = {
    src: dir.src + 'images/**/*',
    build: dir.build + 'images/'
};

// image processing
gulp.task('images', () => {
    return gulp.src(images.src)
        .pipe(newer(images.build))
        .pipe(imagemin())
        .pipe(gulp.dest(images.build));
});

// CSS settings
const css = {
    src: dir.src + 'scss/style.scss',
    watch: dir.src + 'scss/**/*',
    build: dir.build,
    sassOpts: {
        outputStyle: 'nested',
        imagePath: images.build,
        precision: 3,
        errLogToConsole: true
    },
    processors: [
        require('postcss-assets')({
            loadPaths: ['images/'],
            basePath: dir.build,
            baseUrl: '/wp-content/themes/wptheme/'
        }),
        require('autoprefixer')({
            browsers: ['last 2 versions', '> 2%']
        }),
        require('css-mqpacker'),
        require('cssnano')
    ]
};

// CSS processing
gulp.task('css', gulp.series('images', () => {
    return gulp.src(css.src)
        .pipe(sass(css.sassOpts))
        .pipe(postcss(css.processors))
        .pipe(gulp.dest(dir.src))
        .pipe(gulp.dest(css.build));
}));

gulp.task('build', gulp.series('templates', 'css'));

// watch for file changes
gulp.task('watch', () => {

    // page changes
    gulp.watch(php.src, ['php']);

    // image changes
    gulp.watch(images.src, ['images']);

    // CSS changes
    gulp.watch(css.watch, ['css']);
});

// default task
gulp.task('default', gulp.series('build', 'watch'));