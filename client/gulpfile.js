/* Vars */
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    jsmin = require('gulp-jsmin'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),

    browserSync = require('browser-sync').create();


/* Sources */
var src_js = 'sources/js/**/*.js',
    src_css = 'sources/css/**/*.css',
    src_stylus = 'sources/css/**/*.styl',
    src_img = 'sources/img/**/*',
    src_ico = 'sources/img/favicon/*.ico',
    src_jade = 'sources/html/**/*.jade',
    src_material = 'node_modules/material-design-lite/material.min.*',
    src_jquery = 'node_modules/jquery/dist/jquery.min.js',
    src_locations = 'locations.json';



/* Destination folder */
var DEST = 'dist/';
var dest_html = DEST + '';


/* Other */
var YOUR_LOCALS = {}; //for jade

var browsers_ver = ['not ie <= 9', 'iOS > 7'];


/* Tasks */
gulp.task('default', ['build', 'watch']);

gulp.task('build', ['buildJs',
    'buildCss',
    'buildStylus',
    'buildJade',
    'buildImg',
    'buildFavicon',
    'buildDeps',
    'reloadLocations'
]);


// Watch Files For Changes
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    //watch sources
    gulp.watch(src_jade, ['reloadJade']);
    gulp.watch(src_js, ['reloadJs']);
    gulp.watch(src_css, ['reloadCss']);
    gulp.watch(src_stylus, ['reloadStylus']);
    gulp.watch(src_img, ['reloadImg']);
    gulp.watch(src_locations, ['reloadLocations']);

    //Reload builded
    gulp.watch(dest_html + '*.html').on('change', browserSync.reload);
    gulp.watch(DEST + '/css/*').on('change', browserSync.reload);
    gulp.watch(DEST + '/js/*').on('change', browserSync.reload);
    gulp.watch(DEST + '/img/*').on('change', browserSync.reload);
    gulp.watch(DEST + src_locations).on('change', browserSync.reload);
});

/* -------------------- Dependencies */
//Material
gulp.task('buildDeps', function () {
    //Material
    gulp.src(src_material)
        .pipe(gulp.dest(DEST + 'material'))

    //Jquery
    gulp.src(src_jquery)
        .pipe(gulp.dest(DEST + 'js'))
});

/* -------------------- Locations */
//Reload
gulp.task('reloadLocations', function () {
    gulp.src(src_locations)
        .pipe(gulp.dest(DEST))
});

/* -------------------- JS */
//Reload
gulp.task('reloadJs', function () {
    gulp.src(src_js)
        .pipe(concat("js.min.js"))
        .pipe(gulp.dest(DEST + 'js'))
});

//Build
gulp.task('buildJs', function () {
    gulp.src(src_js)
        .pipe(jsmin())
        .pipe(concat("js.min.js"))
        .pipe(gulp.dest(DEST + 'js'))
});


/* -------------------- CSS */
//Reload
gulp.task('reloadCss', function () {
    gulp.src(src_css)
        .pipe(concat("css.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
});

//Build
gulp.task('buildCss', function () {
    gulp.src(src_css)
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat("css.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
});


/* -------------------- Stylus */
//Reload
gulp.task('reloadStylus', function () {
    gulp.src(src_stylus)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
});

//Build
gulp.task('buildStylus', function () {
    gulp.src(src_stylus)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
});


/* -------------------- Html */
//Reload
gulp.task('reloadHtml', function () {
    gulp.src(src_html)
        .pipe(gulp.dest(dest_html))
});

//Build
gulp.task('buildHtml', ['reloadHtml']);
//see jade


/* -------------------- Jade */
//Reload
gulp.task('reloadJade', function () {
    gulp.src(src_jade)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(dest_html))
});

//Build
gulp.task('buildJade', function () {
    gulp.src(src_jade)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(dest_html))
});


/* -------------------- Images */
//Reload
gulp.task('reloadImg', ['buildImg']);

//Build
gulp.task('buildImg', function () {
    gulp.src(src_img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DEST + 'img'))
});

//Build
gulp.task('buildFavicon', function () {
    gulp.src(src_ico)
        .pipe(gulp.dest(dest_html))
});