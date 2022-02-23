
var gulp = require("gulp");
var sass = require("gulp-sass");
var min  = require("gulp-cssnano");
var minJs  = require("gulp-uglify");
var brosync = require('browser-sync').create();
const { parallel } = require("gulp");

function  Default(){

    brosync.init({
       
        server: {
            baseDir:"./"
        }
    });

 
    gulp.watch('js/*.js',Js);
    gulp.watch('css/sass/*.scss', Sass);
    gulp.watch("css/sass/*.scss").on('change', brosync.reload);
    gulp.watch("*.html").on('change',brosync.reload);

}


function Sass(){

    return gulp.src('css/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(brosync.stream());
}
 function Js() {
    return gulp.src("js/*.js")
    .pipe(brosync.stream());
 }


 function MinifyCss(){
     return gulp.src("./css/estilo.css","./css/fontawesome.css")
    .pipe(min())
     .pipe(gulp.dest("./css/MinFiles"));
 }

 function MinifyJs(){
    return gulp.src("./js/*.js")
    .pipe(minJs())
    .pipe(gulp.dest("./js/minJs"));
}

exports.default = Default;
exports.Minify = parallel(MinifyCss,MinifyJs);