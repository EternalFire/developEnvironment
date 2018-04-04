const fs = require("fs");
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');

let srcJSGlob = "./src/**/*.js";
let files = [];

gulp.task("scripts", ["files"], function(cb) {
    return gulp.src(files)

        .pipe(sourcemaps.init())
    .pipe(concat('_game.js'))
    // .pipe(minify())
    // .pipe(uglify())
    // .on('error', gutil.log)
    .pipe(gulp.dest('.'))
        .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.'))
    ;
});

gulp.task("files", function(cb) {
    var data = fs.readFileSync('project.json', {encoding: "utf8"});
    var object = JSON.parse(data);
    if (object && object.jsList && object.jsList.length >= 0) {
        files = object.jsList;
        cb();
        return;
    }
    cb();
})

gulp.task("default", ["scripts"]);

// gulp.task("default", function() {
//     // return gulp.src("./src/head.eval.js")
//     //     // .pipe(minify())
//     //     .pipe(uglify())
//     //     .on('error', gutil.log)
//     //     .pipe(gulp.dest('.'))

//     // return gulp.src("./src/GameScene.js")
//     // .pipe(sourcemaps.init({loadMaps: true}))
//     // // 在这里将转换任务加入管道
//     // // .pipe(uglify())
//     // // .on('error', gutil.log)
//     // .pipe(sourcemaps.write('./'))
//     // .pipe(gulp.dest('.'))
// });
