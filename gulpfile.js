// var gulp = require('gulp'),
//     cleanCSS = require('gulp-clean-css'),
//     concat = require('gulp-concat'),
//     uglify = require('gulp-uglify'),
//     csso = require('gulp-csso'),
//     prefix = require('gulp-autoprefixer'),
//     sass = require('gulp-sass'),    
//     minify = require('gulp-minify');

// gulp.task('default', ['del'], function() {
//     // default task code here
// });

// // SASS Version
// gulp.task('sass', function() {
//     return gulp.src('./themes/andso/static/scss/app.scss')
//         .pipe(sass())
//         // Minify the file
//         .pipe(csso())
//         .pipe(gulp.dest("./themes/andso/static/css"))
//         // .pipe(browserSync.stream());
// });

// gulp.task('watch', ['sass'], function() {
//     gulp.watch(['./themes/andso/static/scss/*.scss'], ['sass']);
//      return gulp.src(['./themes/andso/static/css/app.min.css'])
//       .pipe(csso())
//     .pipe(gulp.dest('./themes/andso/static/css'))
// });

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

// Put this after including our dependencies
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "themes/andso/static/scss/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "themes/andso/static/css"
    }
 
    // Easily add additional paths
    // ,html: {
    //  src: '...',
    //  dest: '...'
    // }
};
	
// Define tasks after requiring dependencies
function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            //.pipe(browserSync.stream())
    );
}

function watch(){
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    style();
 
    gulp.watch(paths.styles.src, style);
}


	
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
	
exports.watch = watch