var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var nodemon = require("gulp-nodemon");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

gulp.task('default', ['build']);
gulp.task('build', ['compile']);


gulp.task("typescript", function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist"));
});


gulp.task('develop',['default'], function () {
  nodemon({
    script: 'dist/index.js',
    ext: 'ts',
    env: { 'NODE_ENV': 'development',
    tasks: ['default']}
  }).on('restart', function () {
      console.log('restarted!')
    })
})


