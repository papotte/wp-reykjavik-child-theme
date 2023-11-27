// Gulp.js configuration
'use strict';
// Gulp and plugins

import gulp from 'gulp';

import zip from 'gulp-zip';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'autoprefixer';
import postcssAssets from 'postcss-assets';
import cssNanno from 'cssnano';
import dartSass from 'sass';
import nodeSass from 'node-sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(nodeSass);

const
    // source and build folders
    dir = {
        src: 'src/',
        build: '../politest/app/public/wp-content/themes/Reykjavik Child/'
    },
    plugins = {
        src: 'plugins/',
        build: '../politest/app/public/wp-content/plugins/'
    };

// Browser-sync
const browsersync = false;

// copy plugins
gulp.task('plugins', () => {
    return gulp.src(plugins.src + '**/*')
        .pipe(gulp.dest(plugins.build));
})

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
    src: dir.src + 'assets/images/**/*',
    build: dir.build + '/assets/images/'
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
        postcssAssets({
            loadPaths: ['images/'],
            basePath: dir.build,
            baseUrl: '/wp-content/themes/wptheme/'
        }),
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }),
        // require('css-mqpacker'),
        cssNanno()
    ]
};

const extraCss = {
    ...css,
    src: dir.src + 'scss/',
    dest: 'assets/css',
}

// CSS processing
gulp.task('custom-css', () => {
    return gulp.src(extraCss.src + 'custom-styles.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});
gulp.task('editor-css', () => {
    return gulp.src(extraCss.src + 'editor-style.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});
gulp.task('editor-blocks-css', () => {
    return gulp.src(extraCss.src + 'editor-style-blocks.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});
gulp.task('customize-css', () => {
    return gulp.src(extraCss.src + 'customize-preview.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});
gulp.task('widgets-css', () => {
    return gulp.src(extraCss.src + 'options-widget-text.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});
gulp.task('woo-css', () => {
    return gulp.src(extraCss.src + 'woocommerce.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});

gulp.task('main-css', () => {
    return gulp.src(extraCss.src + 'main.scss')
        .pipe(sass(extraCss.sassOpts))
        .pipe(postcss(extraCss.processors))
        .pipe(gulp.dest(dir.src + extraCss.dest))
        .pipe(gulp.dest(dir.build + extraCss.dest));
});

// CSS processing
gulp.task('css', gulp.series('images',
    'editor-css',
    'editor-blocks-css',
    'customize-css',
    'widgets-css',
    'custom-css',
    'woo-css',
    'main-css',
    () => {
        return gulp.src(css.src)
            .pipe(sass(css.sassOpts))
            .pipe(postcss(css.processors))
            .pipe(gulp.dest(dir.src))
            .pipe(gulp.dest(css.build));
    }));

// Zip theme
gulp.task('zip', () => {
    return gulp.src('src/**')
        .pipe(zip('reykjavik-child.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-plugins', gulp.series('plugins'));
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